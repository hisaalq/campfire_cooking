import { Router } from "express";
import {
  getIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "./ingredients.controller";

const ingredientsRouter = Router();

// All routes are public (no authentication required)
ingredientsRouter.get("/", getIngredients);
ingredientsRouter.get("/:id", getIngredientById);
ingredientsRouter.post("/", createIngredient);
ingredientsRouter.put("/:id", updateIngredient);
ingredientsRouter.delete("/:id", deleteIngredient);

export default ingredientsRouter;
