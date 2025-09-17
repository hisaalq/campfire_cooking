import { Router } from "express";
import { authorization } from "../../middleware/verifyUser";
import upload from "../../middleware/multer";
import { createRecipe, getRecipeByCategory } from "./recipes.controller";

const recipesRouter = Router();

recipesRouter.post(
  "/recipes",
  authorization,
  upload.single("image"),
  createRecipe
);
recipesRouter.get("/recipes/:category", getRecipeByCategory);

export default recipesRouter;
