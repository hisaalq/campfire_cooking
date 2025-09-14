import express from "express";
import { connectToDatabase } from "./database";
import userRouter from "./api/user/user.router";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

connectToDatabase();

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
