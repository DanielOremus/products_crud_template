import { configDotenv } from "dotenv"
configDotenv()

export const config = Object.freeze({
  db: {
    databaseName: process.env.DB_NAME,
    databaseUrl: process.env.DB_URL,
    mongoURI: `${process.env.DB_URL}/${process.env.DB_NAME}`,
  },
  port: process.env.PORT,
})
