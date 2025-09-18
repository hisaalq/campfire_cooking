import { Request, Response, NextFunction } from "express";
import { Recipe } from "../../models/recipes";
import { User } from "../../models/users";
import { Ingredient } from "../../models/ingredient";
import mongoose from "mongoose";

export const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ingredients } = req.body;

    // Validate ingredients if provided
    if (ingredients && Array.isArray(ingredients)) {
      for (const ingredient of ingredients) {
        if (ingredient.ingredient) {
          // Validate that ingredient.ingredient is a valid ObjectId
          if (!mongoose.Types.ObjectId.isValid(ingredient.ingredient)) {
            return res.status(400).json({
              success: false,
              message: `Invalid ingredient ID: ${ingredient.ingredient}`,
            });
          }
          
          // Check if ingredient exists
          const ingredientExists = await Ingredient.findById(ingredient.ingredient);
          if (!ingredientExists) {
            return res.status(400).json({
              success: false,
              message: `Ingredient with ID ${ingredient.ingredient} not found`,
            });
          }
        }
        
        // Validate quantity
        if (ingredient.quantity && (isNaN(ingredient.quantity) || ingredient.quantity <= 0)) {
          return res.status(400).json({
            success: false,
            message: "Ingredient quantity must be a positive number",
          });
        }
      }
    }

    if (req.file) {
      req.body.image = req.file.path;
    }
    
    const recipe = await Recipe.create({ ...req.body, author: req.user?.id });
    
    // Add the recipe to the user's created_recipes array
    if (req.user?.id) {
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { created_recipes: recipe._id } },
        { new: true }
      );
    }
    
    return res.status(201).json({
      success: true,
      data: recipe,
      message: "Recipe created successfully",
    });
  }
  catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create recipe",
    });
  }
};

export const getRecipeByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const recipes = await Recipe.find({ category })
      .populate({
        path: "ingredients", 
        populate: {
          path: "ingredient", 
          select: "name criteria allergy",
          populate: {
            path: "criteria",
            select: "name"
          }
        }
      })
      .populate("author", "username image")
      
    res.status(200).json({
      success: true,
      data: recipes,
      count: recipes.length
    });
  }
  catch (error) {
    console.error("Error getting recipe by category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get recipe by category",
    });
  }
};

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find()
      .populate({
        path: "ingredients", 
        populate: {
          path: "ingredient", 
          select: "name criteria allergy",
          populate: {
            path: "criteria",
            select: "name"
          }
        }
      })
      .populate("author", "username image")
      
    res.status(200).json({
      success: true,
      data: recipes,
      count: recipes.length
    });
  }
  catch (error) {
    console.error("Error getting recipes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get recipes",
    });
  }
};