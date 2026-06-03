import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Barber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "N/A", length: 300 })
  name: string;
}
