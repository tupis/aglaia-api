import * as express from "express";
import { Request, Response } from "express";
import newsController from "../controllers/news.controller";

const newsRouter = express.Router();

newsRouter.get("/saved", (req: Request, res: Response) => {
  return newsController.getSavedNews(req, res);
});

newsRouter.post("/updateSaved", (req: Request, res: Response) => {
  return newsController.updateSavedNews(req, res);
});

newsRouter.post("/verifySaved", (req: Request, res: Response) => {
  return newsController.verifySaved(req, res);
});

export default newsRouter;
