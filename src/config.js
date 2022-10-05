import dotenv from 'dotenv'
dotenv.config()

export default {
  dominio: process.env.DOMINIO,
  port: process.env.PORT ?? 3010

}
