import mongoose, { HydratedDocument, InferSchemaType, Schema } from "mongoose";

const recipeIngredientSchema = new Schema({
  ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
  quantity: { type: Number, required: true },
})

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, required: true },
    ingredients: [recipeIngredientSchema],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    steps: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
export type RecipeAttrs = InferSchemaType<typeof recipeSchema>;
export type RecipeDoc = HydratedDocument<RecipeAttrs>;
