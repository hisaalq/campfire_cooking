import { NextFunction, Request, Response } from "express";
import { User } from "../../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email, username });
    if (user) {
      return res.status(400).json({ message: "email already exists" });
    } else {
      const existingusername = await User.findOne({ username: username });
      if (existingusername) {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;

    const newuser = await User.create({
      username,
      email,
      password,
      image: (req as any).file?.path || "",
    });
    const token = jwt.sign(
      { id: newuser._id },
      process.env.JWT_SECRET as string
    );
    res
      .status(201)
      .json({ message: "User created successfully", newuser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
      res.status(200).json({ message: "User signed in successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginuser = await User.findOne(signin(req, res, next));
    const token = jwt.sign({ loginuser }, process.env.JWT_SECRET as string);
    res.status(200).json({ message: "Profile fetched successfully", loginuser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginuser = await User.findOne(signin(req, res, next));
    if (!loginuser) {
      return res.status(400).json({ message: "User not found" });
    }
    const { username, email, password, image, bio, created_recipes, followers, following, saved_recipes, ingredients } = req.body;
    const updateduser = await User.findByIdAndUpdate(loginuser._id, { username, email, password, image, bio, created_recipes, followers, following, saved_recipes, ingredients }, { new: true });
    res.status(200).json({ message: "Profile updated successfully", updateduser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};