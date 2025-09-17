import mongoose, { Schema, Document } from "mongoose";

export interface IBookmark extends Document {
  recipe: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const bookmarkSchema = new Schema({
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Bookmark = mongoose.model<IBookmark>("Bookmark", bookmarkSchema);