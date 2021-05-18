import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    this.name = this.name.toLowerCase()
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.name = this.name.toLowerCase()
  }


}

export enum AppConfigStatus {
  DESACTIVE = 0,
  ACTIVE = 1,
}
