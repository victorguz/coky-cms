import { Model, Table, Column, AutoIncrement, PrimaryKey, NotEmpty, AllowNull, ForeignKey } from "sequelize-typescript"
import { seq } from "../../database"
import Dni from "../other.tables/dnis/dnis.model"

/**
 * Interface que contiene la forma original de la tabla 'Personas', con sus _id de referencia
 */
interface IPerson {

    id: number | null
    name: string
    lastname: string
    birthdate: Date
    nid_id: number
    email_id: number | null
    phone_id: number | null
    direction_id: number | null
    status: number
    created_at: Date

}
/**
 * Interface que contiene la forma original de la tabla 'Personas', pero en vez de los _id de referencia, contiene los datos.
 */
interface IPersonView {

    id: number
    nid: string
    name: string
    lastname: string
    birthdate: Date
    email: string
    phone: string
    direction: string
    status: number
    created_at: Date

}

/**
 * Interface que contiene la forma original de la tabla 'Personas', con sus _id de referencia y los datos referenciados
 */
interface IPersonViewFull {
    //ID's
    id: number
    nid_id: number //int, fk_nid
    email_id: number //int, fk_email
    phone_id: number //int, fk_phone
    direction_id: number //int, fk_direction

    nid: string
    name: string
    lastname: string
    birthdate: Date
    email: string
    phone: string
    direction: string
    status: number
    created_at: Date

}

@Table({
    tableName: "coky_people",
    timestamps: false
})
export default class Person extends Model implements IPerson {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number | null

    @NotEmpty
    @AllowNull(false)
    @Column
    name!: string

    @NotEmpty
    @AllowNull(false)
    @Column
    lastname!: string

    @AllowNull(false)
    @Column
    birthdate!: Date

    @Column
    nid_id!: number

    @Column
    email_id!: number | null

    @Column
    phone_id!: number | null

    @Column
    direction_id!: number | null

    @Column
    status!: number

    @Column
    created_at!: Date

}