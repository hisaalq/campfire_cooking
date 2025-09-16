import mongoose, { HydratedDocument, InferSchemaType, Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
  bio: { type: String, required: false },
  created_recipes: { type: [Schema.Types.ObjectId], ref: "recipes", required: false },
  followers: { type: [Schema.Types.ObjectId], ref: "users", required: false },
  following: { type: [Schema.Types.ObjectId], ref: "users", required: false },
  saved_recipes: { type: [Schema.Types.ObjectId], ref: "recipes", required: false },
  ingredients: { type: [Schema.Types.ObjectId], ref: "ingredients", required: false },
});

export type UserAttrs = InferSchemaType<typeof userSchema>;
export type UserDoc = HydratedDocument<UserAttrs>;
export const User = mongoose.model("users", userSchema);