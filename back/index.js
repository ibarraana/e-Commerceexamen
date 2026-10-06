import 'dotenv/config';
import app from "./src/app.js";
import { sequelize, testConnection } from "./src/config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Probar conexión
    await testConnection();

    // 2. Sincronizar tablas con la base de datos
    await sequelize.sync({ alter: true });    

    // 5. Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`)
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error)
  }
};

startServer()