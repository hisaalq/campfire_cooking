import express from "express";
import { connectToDatabase } from "./database";
import userRouter from "./api/user/user.router";
import signupRouter from "./api/signup/signup.router";
import categoriesRouter from "./api/categories/categories.router";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

connectToDatabase();


app.use("/api", userRouter);
app.use("/api/signup", signupRouter);
app.use("/api/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
