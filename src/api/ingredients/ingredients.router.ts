import { Router } from "express";
import {
  // Ingredient endpoints
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  // Category endpoints
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./ingredients.controller";
import { authorization } from "../../middleware/verifyUser";

const ingredientsRouter = Router();

// ===== INGREDIENT ROUTES =====
ingredientsRouter.get("/", getIngredients);
ingredientsRouter.get("/:id", getIngredientById);
ingredientsRouter.post("/", authorization, createIngredient);
ingredientsRouter.put("/:id", authorization, updateIngredient);
ingredientsRouter.delete("/:id", authorization, deleteIngredient);

// ===== CATEGORY ROUTES =====
ingredientsRouter.get("/categories", getCategories);
ingredientsRouter.get("/categories/:id", getCategoryById);
ingredientsRouter.post("/categories", authorization, createCategory);
ingredientsRouter.put("/categories/:id", authorization, updateCategory);
ingredientsRouter.delete("/categories/:id", authorization, deleteCategory);

export default ingredientsRouter;
