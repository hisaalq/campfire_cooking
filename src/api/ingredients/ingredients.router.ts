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
ingredientsRouter.get("/ingredients", getIngredients);
ingredientsRouter.get("/:id", getIngredientById);
ingredientsRouter.post("/ingredients", authorization, createIngredient);
ingredientsRouter.put("/ingredients/:id", authorization, updateIngredient);
ingredientsRouter.delete("/ingredients/:id", authorization, deleteIngredient);

export default ingredientsRouter;
