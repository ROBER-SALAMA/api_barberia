import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { User } from "./User";
import { Barber } from "./Barber";

import { AppointmentStatus } from "../enums/AppointmentStatus";
import { AppointmentDetail } from "./AppointmentDetail";

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

  @Column({
    type: "date",
  })
  date: string;

  @Column({
    type: "time",
  })
  time: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  total: number;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.EN_PROCESO,
  })
  status: AppointmentStatus;

  @OneToMany(() => AppointmentDetail, (detail) => detail.appointment, {
    cascade: true,
    eager: true,
  })
  details: AppointmentDetail[];
}
