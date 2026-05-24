import { Request, Response } from "express";

import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepository.find();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const user = userRepository.create({
      name,
      email,
      password,
      role,
    });

    await userRepository.save(user);

    res.json({
      message: "Usuario creado",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
