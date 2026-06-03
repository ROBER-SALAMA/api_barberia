import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Barber } from "../entities/Barber";

const barberRepository = AppDataSource.getRepository(Barber);

export const getBarbers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const barbers = await barberRepository.find();

    res.json(barbers);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const getBarberById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const barber = await barberRepository.findOne({
      where: { id },
    });

    if (!barber) {
      res.status(404).json({
        message: "Barbero no encontrado",
      });

      return;
    }

    res.json(barber);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const createBarber = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name } = req.body;

    const barber = barberRepository.create({
      name,
    });

    await barberRepository.save(barber);

    res.status(201).json(barber);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const updateBarber = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const { name } = req.body;

    const barber = await barberRepository.findOne({
      where: { id },
    });

    if (!barber) {
      res.status(404).json({
        message: "Barbero no encontrado",
      });

      return;
    }

    barber.name = name;

    await barberRepository.save(barber);

    res.json(barber);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const deleteBarber = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const barber = await barberRepository.findOne({
      where: { id },
    });

    if (!barber) {
      res.status(404).json({
        message: "Barbero no encontrado",
      });

      return;
    }

    await barberRepository.remove(barber);

    res.json({
      message: "Barbero eliminado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
