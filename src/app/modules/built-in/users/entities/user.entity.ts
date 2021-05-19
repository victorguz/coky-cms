import { Exclude } from "class-transformer";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "coky_users" })
export class User extends BaseEntity {
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

  @Column({ type: "text", nullable: false, select: false })
  password: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: "json", nullable: true })
  data: any;

  @Column({ type: "int", nullable: false })
  role: number;

  @Column({ type: "int", nullable: false })
  status: number;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;


  @UpdateDateColumn({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  modified: Date;

  @BeforeInsert()
  beforeInsert() {
    this.first_name = this.first_name.toLowerCase()
    this.first_lastname = this.first_lastname.toLowerCase()
    this.second_name = this.second_name.toLowerCase()
    this.second_lastname = this.second_lastname.toLowerCase()
    this.username = this.username.toLowerCase()
    this.email = this.email.toLowerCase()
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.first_name = this.first_name.toLowerCase()
    this.first_lastname = this.first_lastname.toLowerCase()
    this.second_name = this.second_name.toLowerCase()
    this.second_lastname = this.second_lastname.toLowerCase()
    this.username = this.username.toLowerCase()
    this.email = this.email.toLowerCase()
  }


}

export enum UserStatus {
  DESACTIVE = 0,
  ACTIVE = 1,
}

export enum UserRole {
  ROOT = 0,
  ADMIN = 1,
  GENERAL = 2,
}
