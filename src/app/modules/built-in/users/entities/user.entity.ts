import { Exclude } from "class-transformer";
import { Max, Min } from "class-validator";
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export enum UserLongRole {
  MIN_ROLE = 0,
  MAX_ROLE = 2,
}

export enum UserStatus {
  DESACTIVE = 0,
  ACTIVE = 1,
}

export enum UserRoles {
  ROOT = UserLongRole.MIN_ROLE,
  ADMIN = 1,
  GENERAL = UserLongRole.MAX_ROLE,
}

export enum UserRoleNames {
  ROOT = "Main user",
  ADMIN = "Admin user",
  GENERAL = "General user",
}

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

  @Exclude()
  @Column({ type: "text", nullable: false, })
  password: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: "json", nullable: true })
  data: any;

  @Min(UserLongRole.MIN_ROLE)
  @Max(UserLongRole.MAX_ROLE)
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

