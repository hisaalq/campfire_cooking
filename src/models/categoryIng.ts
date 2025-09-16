import mongoose, { Schema, Document } from "mongoose";

export interface IIngredientCategory extends Document {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
}

const ingredientCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    icon: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: "#6B7280",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const IngredientCategory = mongoose.model<IIngredientCategory>(
  "IngredientCategory",
  ingredientCategorySchema
);
