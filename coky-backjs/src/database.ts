import { createConnection } from "net";
import { Sequelize } from "sequelize-typescript";
import keys from "./keys";


export const seq = new Sequelize(
    keys.database.database,
    keys.database.user,
    keys.database.password,
    {
        host: keys.database.host,
        port: keys.database.port,
        dialect: "mariadb",
        models: [`${__dirname}/persons/persons.model`,]
        // dialectOptions:{}
    },
);

export function conectar() {
    seq.authenticate().then(async () => {
        console.log("Sequelize Works!")
        try {
            await seq.sync({ force: true })
        } catch (error) {
            console.log("Sequelize Works With ERRORS: ", error)
        }
    }).catch((error) => {
        console.log("Sequelize Error: ", error)
    })
}
