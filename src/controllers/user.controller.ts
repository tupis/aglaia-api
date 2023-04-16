import { Request, Response } from "express";
import userService from "../services/user.service";

const login = async (req: Request, res: Response) => {
  try {
    const user = await userService.login(req.body);
    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(error.httpCode)
      .json({ message: error.name, errorCode: error.httpCode });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    return res.status(200).json(user);
  } catch (error: any) {
    return res
      .status(error.httpCode)
      .json({ message: "deu erro", code: error.httpCode });
  }
};

const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req?.headers?.authorization?.replace("Bearer ", "");

    const verifyToken = await userService.verifyToken(token);
    return res.status(200).json(verifyToken);
  } catch (error: any) {
    return res
      .status(error.httpCode)
      .json({ message: error.name, errorCode: error.httpCode });
  }
};

export default {
  login,
  register,
  verifyToken,
};
