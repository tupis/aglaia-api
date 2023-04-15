import { Request, Response } from "express";
import userService from "../services/user.service";

const login = async (req: Request, res: Response) => {
  try {
    const user = await userService.login(req.body);
    return res.status(200).send(user);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    return res.status(200).send(user);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export default {
  login,
  register,
};
