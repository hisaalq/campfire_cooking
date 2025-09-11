import express from "express";
import connectDB from "./database";


const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});