import mongoose, { HydratedDocument, InferSchemaType, Schema } from "mongoose";

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  allergy: { type: String, required: true },
  nutrition: { type: String, required: true },
  image: { type: String, required: true },
});

export const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export type IngredientAttrs = InferSchemaType<typeof ingredientSchema>;
export type IngredientDoc = HydratedDocument<IngredientAttrs>;