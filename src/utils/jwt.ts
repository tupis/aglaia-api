import { sign, verify } from "jsonwebtoken";
import { AppError, HttpCode } from "../exceptions/appError";

const secret = "mysecret";

const verifyToken = (token: string) => {
  return verify(token, secret, (err, decoded) => {
    if (err) {
      // throw new Error("Invalid token");
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "Invalid token",
      });
    }
    return decoded;
  });
};

const signToken = (payload: any) => {
  return sign(payload, secret);
};

export default {
  verifyToken,
  signToken,
};
