import { Router } from "express";
import { signup, signin, getProfile, updateProfile, getUsers } from "./user.controller";
import { authorization } from "../../middleware/verifyUser";
import upload from "../../middleware/multer";

const userRouter = Router();

userRouter.post("/signup", upload.single("image"), signup);
userRouter.post("/signin", signin);
userRouter.get("/profile", authorization, getProfile);
userRouter.put("/updateprofile", authorization, updateProfile);
userRouter.get("/Users", getUsers);

export default userRouter;
