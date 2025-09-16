import mongoose, { Schema, Document } from "mongoose";

export interface IIngredient extends Document {
  name: string;
  criteria: mongoose.Types.ObjectId;
  allergy: boolean;
}

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    criteria: {
      type: Schema.Types.ObjectId,
      ref: "IngredientCategory",
      required: true,
    },
    allergy: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Ingredient = mongoose.model<IIngredient>(
  "Ingredient",
  ingredientSchema
);
