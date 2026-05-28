import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "N/A", length: 300 })
  name: string;

  @Column("text")
  description: string;

  @Column("decimal", {
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  duration: number;
}
