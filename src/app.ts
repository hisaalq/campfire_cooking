import express from "express";
import { connectToDatabase } from "./database";
import userRouter from "./api/user/user.router";
import categoriesRouter from "./api/categories/categories.router";
import ingredientsRouter from "./api/ingredients/ingredients.router";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

connectToDatabase();

app.use("/api", userRouter);
app.use("/api/signup", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/ingredients", ingredientsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
