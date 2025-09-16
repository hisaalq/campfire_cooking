import { Router } from "express";
import { authorization } from "../../middleware/verifyUser";
import upload from "../../middleware/multer";
import { createRecipe, getRecipeByCategory } from "./recipes.controller";

const recipesRouter = Router();

recipesRouter.post("/", authorization, upload.single("image"), createRecipe);
recipesRouter.get("/:category", getRecipeByCategory);

export default recipesRouter;