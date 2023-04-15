import * as express from "express";
import { Request, Response } from "express";
import userRouter from "./users";

const router = express.Router();

router.use("/users", userRouter);

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default router;
