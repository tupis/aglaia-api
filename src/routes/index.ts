import * as express from "express";
import { Request, Response } from "express";
import userRouter from "./users";
import newsRouter from "./news";
import auth from "../middlewares/auth.middleware";

const router = express.Router();

router.use("/users", userRouter);
router.use("/news", auth, newsRouter);

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

export default router;
