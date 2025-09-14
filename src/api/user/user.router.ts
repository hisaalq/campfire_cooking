import { Router } from "express";
import { signin, signup, getProfile } from "./user.controller";
import { authorization } from "../../middleware/verifyUser";
import upload from "../../middleware/multer";

const userRouter = Router();

userRouter.post("/signup", upload.single("image"), signup);
userRouter.post("/signin", authorization, signin);
userRouter.get("/profile", authorization, getProfile);

export default userRouter;