import 'dotenv/config';
import app from "./src/app.js";
import { sequelize, testConnection } from "./src/config/database.js";
import Admin from "./src/models/Admin.js";
import Client from "./src/models/Client.js";
import bcrypt from "bcryptjs";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Probar conexión
    await testConnection();

    // 2. Sincronizar tablas con la base de datos
    await sequelize.sync({ alter: true });

    // 3. Crear Admin inicial por defecto si no existe
    const adminExist = await Admin.findOne({ where: { email: 'admin@tienda.com' } });
    if (!adminExist) {
      const passHashAdmin = await bcrypt.hash('admin123', 10);
      await Admin.create({
        nombre: 'Admin Principal',
        email: 'admin@tienda.com',
        passwordAdmin: passHashAdmin
      });
      console.log('--- Admin de prueba creado: admin@tienda.com / admin123 ---');
    }

    // 4. Crear Cliente inicial por defecto si no existe
    const clientExist = await Client.findOne({ where: { email: 'cliente@tienda.com' } });
    if (!clientExist) {
      const passHashClient = await bcrypt.hash('cliente123', 10);
      await Client.create({
        nombre: 'Cliente Prueba',
        email: 'cliente@tienda.com',
        passwordClient: passHashClient,
        direccion: 'Calle Falsa 123',
        telefono: '123456789'
      });
      console.log('--- Cliente de prueba creado: cliente@tienda.com / cliente123 ---');
    }

    // 5. Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();