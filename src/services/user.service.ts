import prisma from "../utils/prisma";
import jwt from "../utils/jwt";
import { hash, compare } from "bcrypt";
import { AppError, HttpCode } from "../exceptions/appError";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  name: string;
  password: string;
}

const login = async (loginPayload: LoginPayload) => {
  const { email, password } = loginPayload;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: "User not found",
    });
  }

  const correctPassword = await compare(password, user.password);

  if (!correctPassword) {
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      description: "Incorrect password",
    });
  }

  Object.defineProperties(user, {
    password: {
      enumerable: false,
    },
  });

  const token = jwt.signToken(user);

  return { user, token };
};

const register = async (registerPayload: RegisterPayload) => {
  const { email, name, password } = registerPayload;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: "User already exists",
    });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  Object.defineProperties(user, {
    password: {
      enumerable: false,
    },
  });

  const token = jwt.signToken(user);

  return { user, token };
};

const verifyToken = async (token: string | undefined) => {
  if (!token) {
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      description: "Token not provided",
    });
  }

  const user = jwt.verifyToken(token);

  return user;
};

export default {
  login,
  register,
  verifyToken,
};
