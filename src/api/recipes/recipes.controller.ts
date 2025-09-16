import { Request, Response, NextFunction } from "express";
import { Recipe } from "../../models/recipes";
import { User } from "../../models/users";
import { signin } from "../user/user.controller";

export const createRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const author = await User.findOne(signin(req, res, next));
    const { name, category, prepTime, cookTime, servings, difficulty, ingredients, ingredientQuantity, tags, steps, description } = req.body;
    const recipe = await Recipe.create({ name, category, prepTime, cookTime, servings, difficulty, ingredients, ingredientQuantity, tags, author, steps, description, image: req.file?.path || "" });
    res.status(201).json({
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
    const recipes = await Recipe.find({ category });
    res.status(200).json({
      success: true,
      data: recipes,
      message: "Recipes fetched successfully",
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