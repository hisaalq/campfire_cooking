import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment");
}

export const env = {
  PORT: process.env.PORT || "8000",
  MONGODB_URI: process.env.MONGODB_URI,
  API_KEY: process.env.API_KEY || "",
};
