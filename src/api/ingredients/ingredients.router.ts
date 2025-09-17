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
} from "./ingredients.controller";
import { authorization } from "../../middleware/verifyUser";

const ingredientsRouter = Router();

// ===== CATEGORY ROUTES =====
ingredientsRouter.get("/categories", getCategories);
ingredientsRouter.get("/categories/:id", getCategoryById);
ingredientsRouter.post("/categories", authorization, createCategory);

// ===== INGREDIENT ROUTES =====
ingredientsRouter.get("/", getIngredients);
ingredientsRouter.get("/:id", getIngredientById);
ingredientsRouter.post("/", authorization, createIngredient);
ingredientsRouter.put("/:id", authorization, updateIngredient);
ingredientsRouter.delete("/:id", authorization, deleteIngredient);

export default ingredientsRouter;
