import { Router } from "express";
import { signup } from "./signup.controller";

const signupRouter = Router();

signupRouter.post("/signup", signup);

export default signupRouter;