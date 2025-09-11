import express from "express";
import { connectToDatabase } from "./database";
import signupRouter from "./api/signup/signup.router";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

connectToDatabase();

app.use("/api", signupRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
