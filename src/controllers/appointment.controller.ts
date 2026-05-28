import { Request, Response } from "express";

import { AppDataSource } from "../config/data-source";

import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { Barber } from "../entities/Barber";
import { Service } from "../entities/Service";

const appointmentRepository = AppDataSource.getRepository(Appointment);

const userRepository = AppDataSource.getRepository(User);

const barberRepository = AppDataSource.getRepository(Barber);

const serviceRepository = AppDataSource.getRepository(Service);

export const getAppointments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const appointments = await appointmentRepository.find();

    res.json(appointments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const appointment = await appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      res.status(404).json({
        message: "Cita no encontrada",
      });

      return;
    }

    res.json(appointment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const createAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId, barberId, serviceId, date, time, status } = req.body;

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({
        message: "Usuario no encontrado",
      });

      return;
    }

    const barber = await barberRepository.findOne({
      where: { id: barberId },
    });

    if (!barber) {
      res.status(404).json({
        message: "Barbero no encontrado",
      });

      return;
    }

    const service = await serviceRepository.findOne({
      where: { id: serviceId },
    });

    if (!service) {
      res.status(404).json({
        message: "Servicio no encontrado",
      });

      return;
    }

    const appointment = appointmentRepository.create({
      user,
      barber,
      service,
      date,
      time,
      status,
    });

    await appointmentRepository.save(appointment);

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const updateAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const { userId, barberId, serviceId, date, time, status } = req.body;

    const appointment = await appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      res.status(404).json({
        message: "Cita no encontrada",
      });

      return;
    }

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    const barber = await barberRepository.findOne({
      where: { id: barberId },
    });

    const service = await serviceRepository.findOne({
      where: { id: serviceId },
    });

    if (!user || !barber || !service) {
      res.status(404).json({
        message: "Relación inválida",
      });

      return;
    }

    appointment.user = user;
    appointment.barber = barber;
    appointment.service = service;
    appointment.date = date;
    appointment.time = time;
    appointment.status = status;

    await appointmentRepository.save(appointment);

    res.json(appointment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

export const deleteAppointment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const appointment = await appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      res.status(404).json({
        message: "Cita no encontrada",
      });

      return;
    }

    await appointmentRepository.remove(appointment);

    res.json({
      message: "Cita eliminada",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
