import { Request, Response } from "express";

import { AppDataSource } from "../config/data-source";
import { Specialty } from "../entities/Specialty";

const specialtyRepository = AppDataSource.getRepository(Specialty);

export const getSpecialties = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const specialties = await specialtyRepository.find();

    res.json(specialties);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const getSpecialtyById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const specialty = await specialtyRepository.findOne({
      where: { id },
    });

    if (!specialty) {
      res.status(404).json({
        message: "Especialidad no encontrada",
      });

      return;
    }

    res.json(specialty);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const createSpecialty = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name } = req.body;

    const specialty = specialtyRepository.create({
      name,
    });

    await specialtyRepository.save(specialty);

    res.status(201).json(specialty);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const updateSpecialty = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const specialty = await specialtyRepository.findOne({
      where: { id },
    });

    if (!specialty) {
      res.status(404).json({
        message: "Especialidad no encontrada",
      });

      return;
    }

    specialty.name = req.body.name;

    await specialtyRepository.save(specialty);

    res.json(specialty);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const deleteSpecialty = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const specialty = await specialtyRepository.findOne({
      where: { id },
    });

    if (!specialty) {
      res.status(404).json({
        message: "Especialidad no encontrada",
      });

      return;
    }

    await specialtyRepository.remove(specialty);

    res.json({
      message: "Especialidad eliminada",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
