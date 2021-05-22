import { ConfigModuleOptions, registerAs } from "@nestjs/config"
import * as Joi from "joi"

/**
 * Environment vars config
 * @author Victorguz <victorguzber@gmail.com> May-2021
 */


/**
 * Para inyectar el modulo de las variables de entorno (env)
 * constructor(@Inject(env.KEY) private configService: ConfigType <typeof env>){}
 */


/**
 * Environment mode
 * @author Victorguz <victorguzber@gmail.com> May-2021
 */
export const isProdMode = process.env.NODE_ENV == "production" ? true : false;

/**
 * Available environments
 * @author Victorguz <victorguzber@gmail.com> May-2021
 */
export const environments = {
  dev: ".e-dev.env",
  prod: ".e-prod.env",
}

/**
 * Typing the environment vars
 * @author Victorguz <victorguzber@gmail.com> May-2021
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
    jwtSecret: process.env.JWT_SECRET,
  }
})



/**
 * Typing and requiring the environment vars
 * @author Victorguz <victorguzber@gmail.com> May-2021
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
    JWT_SECRET: Joi.string().required(),
  })
}
