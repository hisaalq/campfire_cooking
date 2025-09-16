import { Request, Response } from "express";
import { Ingredient } from "../../models/ingredient";
import { IngredientCategory } from "../../models/categoryIng";
import mongoose from "mongoose";

// ===== INGREDIENT ENDPOINTS =====
export const getIngredients = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;

    let query: any = {};
    if (categoryId) {
      query.criteria = categoryId;
    }

    const ingredients = await Ingredient.find(query)
      .populate("criteria", "name description icon color")
      .select("name criteria allergy")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: ingredients,
      count: ingredients.length,
    });
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ingredients",
    });
  }
};

export const getIngredientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findById(id)
      .populate("criteria", "name description icon color")
      .select("name criteria allergy");

    if (!ingredient) {
      return res.status(404).json({
        success: false,
        message: "Ingredient not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ingredient,
    });
  } catch (error) {
    console.error("Error fetching ingredient:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ingredient",
    });
  }
};

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const { name, criteria, allergy } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Ingredient name is required",
      });
    }

    if (!criteria) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Check if category exists
    const category = await IngredientCategory.findById(criteria);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    // Check if ingredient already exists in this category
    const existingIngredient = await Ingredient.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
      criteria: criteria,
    });

    if (existingIngredient) {
      return res.status(400).json({
        success: false,
        message: "Ingredient already exists in this category",
        existingIngredient: {
          id: existingIngredient._id,
          name: existingIngredient.name,
          category: category.name,
        },
      });
    }

    const ingredient = await Ingredient.create({
      name: name.trim(),
      criteria: new mongoose.Types.ObjectId(criteria), // Convert string to ObjectId
      allergy: allergy || false,
    });

    // Populate the category data in response
    await ingredient.populate("criteria", "name description icon color");

    res.status(201).json({
      success: true,
      data: ingredient,
      message: "Ingredient created successfully",
    });
  } catch (error: any) {
    console.error("Error creating ingredient:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Ingredient already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create ingredient",
    });
  }
};

export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, criteria, allergy } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Ingredient name is required",
      });
    }

    if (criteria) {
      // Check if new category exists
      const category = await IngredientCategory.findById(criteria);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Invalid category",
        });
      }
    }

    // Check if ingredient already exists in the same category
    const existingIngredient = await Ingredient.findOne({
      _id: { $ne: id },
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
      criteria: criteria || undefined,
    });

    if (existingIngredient) {
      return res.status(400).json({
        success: false,
        message: "Ingredient already exists in this category",
      });
    }

    const updateData: any = {
      name: name.trim(),
      allergy: allergy !== undefined ? allergy : false,
    };

    if (criteria) {
      updateData.criteria = criteria;
    }

    const ingredient = await Ingredient.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("criteria", "name description icon color");

    if (!ingredient) {
      return res.status(404).json({
        success: false,
        message: "Ingredient not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ingredient,
      message: "Ingredient updated successfully",
    });
  } catch (error) {
    console.error("Error updating ingredient:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update ingredient",
    });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const ingredient = await Ingredient.findByIdAndDelete(id);

    if (!ingredient) {
      return res.status(404).json({
        success: false,
        message: "Ingredient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ingredient deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete ingredient",
    });
  }
};

// ===== CATEGORY ENDPOINTS =====
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await IngredientCategory.find({ isActive: true })
      .select("name description icon color")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, color } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await IngredientCategory.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
        existingCategory: {
          id: existingCategory._id,
          name: existingCategory.name,
        },
      });
    }

    const category = await IngredientCategory.create({
      name: name.trim(),
      description: description?.trim(),
      icon,
      color,
    });

    res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  } catch (error: any) {
    console.error("Error creating category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await IngredientCategory.findById(id).select(
      "name description icon color"
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};
