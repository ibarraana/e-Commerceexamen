import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: console.log
  }
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada correctamente.");
  } catch (error) {
    console.error("Error de conexión:", error);
  }
};