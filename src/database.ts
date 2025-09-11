import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MongoDB URI is not defined.");
    process.exit();
  }
  try {

    await mongoose.connect(uri);
    console.log("MongoDB connection successful");
=======
    const conn = await mongoose.connect(process.env.DB_URL!);
    console.log(`MongoDB connected: ${conn.connection.host}`);

  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit();
  }
}
