import express from "express";
import { connectToDatabase } from "./database";
import userRouter from "./api/user/user.router";
import categoriesRouter from "./api/categories/categories.router";
import recipesRouter from "./api/recipes/recipes.router";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

connectToDatabase();


app.use("/api", userRouter);
app.use("/api/signup", userRouter);
app.use("/api/signin", userRouter);
app.use("/api/profile", userRouter);
app.use("/api/updateprofile", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/recipes", recipesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
