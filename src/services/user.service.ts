import prisma from "../utils/prisma";
import jwt from "../utils/jwt";
import { hash, compare } from "bcrypt";

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
    throw new Error("User not found");
  }

  const correctPassword = await compare(password, user.password);

  if (!correctPassword) {
    throw new Error("Incorrect password");
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
    throw new Error("User already exists");
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

export default {
  login,
  register,
};
