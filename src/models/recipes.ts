import mongoose, { HydratedDocument, InferSchemaType, Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, required: true },
    ingredients: {
      type: [Schema.Types.ObjectId],
      ref: "Ingredient",
      required: true,
    },
    ingredientQuantity: {
      type: [Schema.Types.ObjectId],
      ref: "IngredientQuantity",
      required: true,
    },
    tags: { type: [Schema.Types.ObjectId], ref: "Tag", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    steps: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Recipe = mongoose.model("Recipe", recipeSchema);
export type RecipeAttrs = InferSchemaType<typeof recipeSchema>;
export type RecipeDoc = HydratedDocument<RecipeAttrs>;
