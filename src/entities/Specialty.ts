import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Barber } from "./Barber";

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: "N/A",
    length: 260,
  })
  name: string;

  @OneToMany(() => Barber, (barber) => barber.specialty)
  barbers: Barber[];
}
