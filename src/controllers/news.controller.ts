import { Request, Response } from "express";
import newsService from "../services/news.service";

const getSavedNews = async (req: Request, res: Response) => {
  try {
    const user = await newsService.getSavedNews(req.user!);
    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(error.httpCode)
      .json({ message: error.name, errorCode: error.httpCode });
  }
};

const updateSavedNews = async (req: Request, res: Response) => {
  try {
    const user = await newsService.updateSavedNews(req.user!, req.body);
    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(error.httpCode)
      .json({ message: "deu erro", code: error.httpCode });
  }
};

const verifySaved = async (req: Request, res: Response) => {
  try {
    const user = await newsService.verifySaved(req.user!, req.body);
    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(error.httpCode)
      .json({ message: "deu erro", code: error.httpCode });
  }
};

export default {
  getSavedNews,
  updateSavedNews,
  verifySaved,
};
