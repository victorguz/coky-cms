import { AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table } from "sequelize-typescript";
import { Model } from "sequelize";
import { seq } from "../../../database";

export interface IDni {

    id: number | null
    type: string
    dni: string

}

@Table({
    tableName: "coky_dnis",
    timestamps: false
})
export default class Dni extends Model implements IDni {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number | null

    @NotEmpty
    @AllowNull(false)
    @Column
    type!: string

    @NotEmpty
    @AllowNull(false)
    @Column
    dni!: string

}