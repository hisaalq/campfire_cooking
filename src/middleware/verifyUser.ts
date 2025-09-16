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
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const [scheme, token] = header?.split(" ") || [];
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid auth format" });
    }
    try {
      const decodeToken: any = jwt.verify(token, JWT_SECRET);
      const { _id } = decodeToken;
      const user = await User.findById(_id);
      if (!user) {
        return next({ status: 401, message: "not authorized" });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
