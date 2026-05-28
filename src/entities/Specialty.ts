import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: "N/A",
    length: 255,
  })
  name: string;
}
