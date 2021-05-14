import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  first_name: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  second_name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  first_lastname: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  second_lastname: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  username: string;

  @Column({ type: "varchar", length: 50, nullable: false, })
  password: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: "json" })
  data: any;

  @Column({ type: "int", nullable: false })
  role: number;

  @Column({ type: "int", nullable: false })
  status: number;

  @Column({ type: "datetime", nullable: false })
  created: Date;

  @Column({ type: "datetime", nullable: true })
  modified: Date;
}
