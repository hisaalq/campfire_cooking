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
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Populate the user with all referenced data
    const populatedUser = await User.findById(req.user._id)
      .populate("created_recipes", "name image category prepTime cookTime")
      .populate("followers", "username image")
      .populate("following", "username image")
      .populate("saved_recipes", "name image category")
      .populate("ingredients", "name");

    res.status(200).json({
      username: populatedUser?.username,
      email: populatedUser?.email,
      image: populatedUser?.image,
      bio: populatedUser?.bio,
      created_recipes: populatedUser?.created_recipes,
      followers: populatedUser?.followers,
      following: populatedUser?.following,
      saved_recipes: populatedUser?.saved_recipes, 
      ingredients: populatedUser?.ingredients
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(400).json({ message: "User not found" });
    }
    const { username,image, bio } = req.body; //TODO: Maybe add password reset
    const updateduser = await User.findByIdAndUpdate(req.user._id, { username, image, bio }, { new: true });
    res.status(200).json({ message: "Profile updated successfully", updateduser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().populate("created_recipes", "name image");
    res.status(200).json({users});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error });
  }
};