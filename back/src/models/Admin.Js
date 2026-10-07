import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordAdmin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM("superadmin", "gestor_productos", "auditor"),
      allowNull: false,
      defaultValue: "superadmin",
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    /*
     * superadmin: Acceso total.
     * gestor_productos: Solo catálogo y stock.
     * auditor: Solo lectura de reportes y métricas.
     */
  },
  {
    tableName: "admins",
    timestamps: false,
  },
);

export default Admin;
