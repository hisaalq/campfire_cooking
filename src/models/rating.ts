import mongoose, { Schema, Document } from "mongoose";

export interface IRating extends Document {
  recipe: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
}

const ratingSchema = new Schema({
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
});

export const Rating = mongoose.model<IRating>("Rating", ratingSchema);