import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "coky_config" })
export class AppConfig extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "json", nullable: true })
  data: any;

  @Column({ type: "int", nullable: false })
  status: number;

  @Column({ type: "datetime", nullable: false })
  created: Date;

  @Column({ type: "datetime", nullable: true })
  modified: Date;

  @BeforeInsert()
  beforeInsert() {
    this.created = new Date();
    this.name = this.name.toLowerCase()
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.modified = new Date();
    this.name = this.name.toLowerCase()
  }


}

export enum AppConfigStatus {
  DESACTIVE = 0,
  ACTIVE = 1,
}
