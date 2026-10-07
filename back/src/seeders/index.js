import 'dotenv/config'
import { sequelize, testConnection } from "../config/database.js"
import { Admin, Client, Producto } from "../models/index.js" 
import bcrypt from "bcryptjs"

async function inicarSeeders() {
  try {
    console.log("Iniciando seeders...")

    // 1. Probar conexión
    await testConnection()

    // 2. Sincronizar tablas con la base de datos
    await sequelize.sync({ alter: true })

    // 3. Crear Admin inicial por defecto si no existe
    const adminExist = await Admin.findOne({
      where: { email: "admin@tienda.com" },
    });
    if (!adminExist) {
      const passHashAdmin = await bcrypt.hash("admin123", 10);
      await Admin.create({
        nombre: "Admin Principal",
        email: "admin@tienda.com",
        passwordAdmin: passHashAdmin,
        rol: "superadmin",
      });
      console.log(
        "Admin de prueba creado: admin@tienda.com / admin123"
      );
    }

    // 4. Crear Cliente inicial por defecto si no existe
    const clientExist = await Client.findOne({
      where: { email: "cliente@tienda.com" },
    });
    if (!clientExist) {
      const passHashClient = await bcrypt.hash("cliente123", 10);
      await Client.create({
        nombre: "Cliente Prueba",
        email: "cliente@tienda.com",
        passwordClient: passHashClient,
        direccion: "Calle Falsa 123",
        telefonso: "123456789",
      });
      console.log(
        "Cliente de prueba creado: cliente@tienda.com / cliente123"
      );
    }

    // Para crear un gestor y un auditor
    const gestorExist = await Admin.findOne({
      where: { email: "gestor@tienda.com" },
    });
    if (!gestorExist) {
      const passHashGestor = await bcrypt.hash("gestor123", 10);
      await Admin.create({
        nombre: "Gestor de Productos",
        email: "gestor@tienda.com",
        passwordAdmin: passHashGestor,
        rol: "gestor_productos",
      });
      console.log(
        "Gestor de productos creado: gestor@tienda.com / gestor123",
      );
    }

    const auditorExist = await Admin.findOne({
      where: { email: "auditor@tienda.com" },
    });
    if (!auditorExist) {
      const passHashAuditor = await bcrypt.hash("auditor123", 10);
      await Admin.create({
        nombre: "Auditor del Sistema",
        email: "auditor@tienda.com",
        passwordAdmin: passHashAuditor,
        rol: "auditor",
      });
      console.log(
        "Auditor del sistema creado: auditor@tienda.com / auditor123"
      );
    }

    const productCount = await Producto.count();
    if (productCount === 0) {
      await Producto.bulkCreate([
        { nombre: "Teclado Mecánico RGB", precio: 85.00, stock: 15, categoria: "Periféricos" },
        { nombre: "Mouse Gamer Inalámbrico", precio: 45.50, stock: 22, categoria: "Periféricos" },
        { nombre: "Monitor 24 Pulgadas IPS", precio: 180.00, stock: 8, categoria: "Monitores" },
        { nombre: "Auriculares HyperX Cloud", precio: 75.00, stock: 12, categoria: "Audio" },
        { nombre: "Placa de Video RTX 4060", precio: 350.00, stock: 5, categoria: "Componentes" }
      ]);
      console.log("Productos ficticios de prueba cargados correctamente");
    }

    console.log("Seeders finalizados correctamente");
    process.exit(0);
  } catch (error) {
    console.error("Error al iniciar los seeders:", error);
    process.exit(1);
  }
}

inicarSeeders();
