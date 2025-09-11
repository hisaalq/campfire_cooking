import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
  bio: { type: String, required: false },
  created_recipes: { type: [Schema.Types.ObjectId], ref: "Recipe", required: false },
  followers: { type: [Schema.Types.ObjectId], ref: "User", required: false },
  following: { type: [Schema.Types.ObjectId], ref: "User", required: false },
  saved_recipes: { type: [Schema.Types.ObjectId], ref: "Recipe", required: false },
  ingredients: { type: [Schema.Types.ObjectId], ref: "Ingredient", required: false },
});

export const User = mongoose.model("User", userSchema);