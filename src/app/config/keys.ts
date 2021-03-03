export let prodMode = true;

export const db = {
    host: prodMode ? "localhost" : "localhost",
    port: prodMode ? 3306 : 3306,
    user: prodMode ? "mtservicescorp_coky" : "admin_general",
    password: prodMode ? "sa!IFjhmhq3+" : "123456",
    database: prodMode ? "mtservicescorp_platform" : "mtservicescorp_platform"
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