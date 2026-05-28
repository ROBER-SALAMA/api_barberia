import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Specialty } from "./Specialty";

@Entity()
export class Barber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Specialty, (specialty) => specialty.barbers, {
    eager: true,
  })
  @JoinColumn({
    name: "specialtyId",
  })
  specialty: Specialty;
}
