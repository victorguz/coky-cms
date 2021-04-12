import { DatabaseConfig } from "app/core/database";

export let prodMode = true;

export const db: DatabaseConfig = {
    host: prodMode ? "localhost" : "localhost",
    port: prodMode ? 3306 : 3306,
    user: prodMode ? "admin_general" : "admin_general",
    password: prodMode ? "123456" : "123456",
    database: prodMode ? "coky-cms" : "coky-cms"
}

export const mails = {
    transporter: {
        service: "google",
        auth: {
            user: 'victorguzber@gmail.com',
            pass: 'InteligenciaArtificial21'
        }
    },
}

