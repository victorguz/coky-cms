import { Global, Module } from "@nestjs/common";
import { registerAs } from "@nestjs/config";
import { ConfigModuleOptions } from "@nestjs/config";
import { environments } from "./environments";

/**
 * Manejar tipado en el ambiente de desarrollo
 */
export const env = registerAs("config", () => {
  return {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    appKey: process.env.APP_KEY,
  }
})

/**
 * Definir el ambiente de desarrollo
 */
export const envConf: ConfigModuleOptions = {
  envFilePath: environments[process.env.NODE_ENV] || ".e-def.env",
  load: [env],
  isGlobal: true,
}

/**
 * Clase con las configuraciones iniciales del framework
 */
export class Config {

  public static readonly appName: string = "Coky framework";
  public static readonly owner: string = "Victorguz";
  public static readonly developer: string = "Victorguz";
  public static readonly developerLink: string = "https://github.com/victorguz";

  public static readonly emailConf = {
    username: "holalelo@gmail.com",
    password: "123456",
    host: "mail.gmail.com",
    protocol: "TLS",
    port: 587,
    replyTo: "reply@gmail.com",
  };

  public static readonly detaultStyles = [
    {
      name: "navbar-color",
      value: "#fffff"
    },
    {
      name: "sidebar-color",
      value: "#fffff"
    },
  ]
}

