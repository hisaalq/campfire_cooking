import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./categories.controller";
import { authorization } from "../../middleware/verifyUser";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);
categoriesRouter.get("/:id", getCategoryById);

categoriesRouter.post("/", authorization, createCategory);
categoriesRouter.put("/:id", authorization, updateCategory);
categoriesRouter.delete("/:id", authorization, deleteCategory);

export default categoriesRouter;
