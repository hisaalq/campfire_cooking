import express from "express";
import { connectToDatabase } from "./database";
import userRouter from "./api/user/user.router";
import recipesRouter from "./api/recipes/recipes.router";
import ingredientsRouter from "./api/ingredients/ingredients.router";
// Import all models to ensure schemas are registered
import "./models/users";
import "./models/recipes";
import "./models/ingredient";
import "./models/categoryIng";
import "./models/tags";
import "./models/bookmark";
import "./models/rating";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

connectToDatabase();

app.use("/api", userRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
