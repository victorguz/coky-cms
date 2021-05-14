import { ConfigModuleOptions, registerAs } from "@nestjs/config"
import * as Joi from "joi"

/**
 * Para inyectar el modulo de las variables de entorno
 */
// import { ConfigType } from '@nestjs/config'; // 👈 Import ConfigType
// import {env} from './config'; // 👈 config file
// @Inject(env.KEY) private configService: ConfigType < typeof env >,


/**
 * Define el estado de producción
 */
export const isProdMode = process.env.NODE_ENV == "production" ? true : false;

/**
 * Variable con todos los nombres de archivos de los ambientes de desarrollo
 */
export const environments = {
  dev: ".e-dev.env",
  prod: ".e-prod.env",
}

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
    appPort: process.env.PORT,
  }
})



/**
 * Definir el ambiente de desarrollo
 */
export const envConf: ConfigModuleOptions = {
  envFilePath: isProdMode ? environments.prod : environments.dev,
  load: [env],
  isGlobal: true,
  validationSchema: Joi.object({
    PORT: Joi.number().default(3000),
    APP_KEY: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
  })
}
