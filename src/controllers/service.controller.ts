import { Request, Response } from "express";

import { AppDataSource } from "../config/data-source";
import { Service } from "../entities/Service";

const serviceRepository = AppDataSource.getRepository(Service);

export const getServices = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const services = await serviceRepository.find();

    res.json(services);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const getServiceById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const service = await serviceRepository.findOne({
      where: { id },
    });

    if (!service) {
      res.status(404).json({
        message: "Servicio no encontrado",
      });

      return;
    }

    res.json(service);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const createService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, description, price, duration } = req.body;

    const service = serviceRepository.create({
      name,
      description,
      price,
      duration,
    });

    await serviceRepository.save(service);

    res.status(201).json(service);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const updateService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const { name, description, price, duration } = req.body;

    const service = await serviceRepository.findOne({
      where: { id },
    });

    if (!service) {
      res.status(404).json({
        message: "Servicio no encontrado",
      });

      return;
    }

    service.name = name;
    service.description = description;
    service.price = price;
    service.duration = duration;

    await serviceRepository.save(service);

    res.json(service);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const deleteService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const service = await serviceRepository.findOne({
      where: { id },
    });

    if (!service) {
      res.status(404).json({
        message: "Servicio no encontrado",
      });

      return;
    }

    await serviceRepository.remove(service);

    res.json({
      message: "Servicio eliminado",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
