import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User";
import { Specialty } from "../entities/Specialty";
import { Barber } from "../entities/Barber";
import { Service } from "../entities/Service";
import { Appointment } from "../entities/Appointment";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",

  host: process.env.DB_HOST,

  port: Number(process.env.DB_PORT),

  username: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  synchronize: true,

  logging: false,

  entities: [User, Specialty, Barber, Service, Appointment],
});
