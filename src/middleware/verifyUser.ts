import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/setting";
import { User } from "../models/users";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("authorization 1");
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }
    console.log("authorization 2");

    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid auth format" });
    }
    console.log("authorization 3");

    try {
      const decodeToken: any = jwt.verify(token, JWT_SECRET);
      console.log("authorization 4");
      const { id } = decodeToken;
      console.log("authorization 4.1", id);
      console.log("authorization 4.2", decodeToken);
      const user = await User.findById(id);
      console.log("authorization 5");
      if (!user) {
        return next({ status: 401, message: "not authorized" });
      }
      console.log("authorization 6");
      req.user = user;
      next();
    } catch (err) {
      console.log("authorization 7");
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.log("authorization error");
    console.log(error);
    next(error);
  }
};