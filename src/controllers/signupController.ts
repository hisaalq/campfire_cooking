import { Request, Response } from "express";
import { getUserByUsername, createUser } from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ error: "Username is already taken." });
  }

  try {
    const user = await createUser({ username, email, password });
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_Secret as string,
      { expiresIn: "1h" }
    );
    return res
      .status(201)
      .json({ message: "User created successfully.", token });
  } catch (err) {
    return res.status(500).json({ error: "Server error." });
  }
};
