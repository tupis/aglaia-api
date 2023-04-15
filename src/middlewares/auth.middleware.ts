import { Request, Response, NextFunction } from "express";
import jwt from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Please authenticate");
    }
    const user = jwt.verifyToken(token);

    if (!user) {
      throw new Error("Please authenticate");
    }

    req.user = user;
    next();
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export default auth;
