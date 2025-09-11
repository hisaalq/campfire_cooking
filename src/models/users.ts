import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);

export async function getUserByUsername(
  username: string
): Promise<IUser | null> {
  return await User.findOne({ username }).select("-password");
}

export async function createUser(user: Partial<IUser>): Promise<IUser> {
  const newUser = new User(user);
  return await newUser.save();
}
