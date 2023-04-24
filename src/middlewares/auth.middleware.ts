import { Request, Response, NextFunction } from "express";
import jwt from "../utils/jwt";
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Please authenticate");
    }
    const user = jwt.verifyToken(token) as unknown as User;

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
