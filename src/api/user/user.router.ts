import { Router } from "express";
import { signin, signup, getProfile } from "./user.controller";
import { authorize } from "../../middleware/verifyUser";
import upload from "../../middleware/multer";

const userRouter = Router();

userRouter.post("/signup", upload.single("image"), signup);
userRouter.post("/signin", authorize, signin);
userRouter.get("/profile", authorize, getProfile);

export default userRouter;