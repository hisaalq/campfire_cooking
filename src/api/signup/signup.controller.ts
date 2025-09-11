import { Request, Response } from "express";
import { User } from "../../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingemail = await User.findOne({email: email});
    if (existingemail) {
      return res.status(400).json({ message: "email already exists" });
    } else {
      const existingusername = await User.findOne({username: username});
      if (existingusername) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};