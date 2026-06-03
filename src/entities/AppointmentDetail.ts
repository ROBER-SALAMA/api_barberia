import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Appointment } from "./Appointment";

@Entity()
export class AppointmentDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceId: number;

  @Column()
  serviceName: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ManyToOne(
    () => Appointment,
    appointment => appointment.details,
    {
      onDelete: 'CASCADE',
    },
  )
  appointment: Appointment;
}
