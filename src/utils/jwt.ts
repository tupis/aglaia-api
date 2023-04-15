import { sign, verify } from "jsonwebtoken";

const secret = "mysecret";

const verifyToken = (token: string) => {
  return verify(token, secret);
};

const signToken = (payload: any) => {
  return sign(payload, secret);
};

export default {
  verifyToken,
  signToken,
};
