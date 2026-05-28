import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User";
import { Barber } from "./Barber";
import { Service } from "./Service";

import { AppointmentStatus } from "../enums/AppointmentStatus";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({
    name: "userId",
  })
  user: User;

  @ManyToOne(() => Barber, {
    eager: true,
  })
  @JoinColumn({
    name: "barberId",
  })
  barber: Barber;

  @ManyToOne(() => Service, {
    eager: true,
  })
  @JoinColumn({
    name: "serviceId",
  })
  service: Service;

  @Column({
    type: "date",
  })
  date: string;

  @Column({
    type: "time",
  })
  time: string;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.EN_PROCESO,
  })
  status: AppointmentStatus;
}
