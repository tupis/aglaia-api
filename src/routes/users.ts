import * as express from "express";
import { Request, Response } from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/login", (req: Request, res: Response) => {
  return userController.login(req, res);
});

userRouter.post("/register", (req: Request, res: Response) => {
  return userController.register(req, res);
});

userRouter.get("/verifyToken", (req: Request, res: Response) => {
  return userController.verifyToken(req, res);
});

export default userRouter;
