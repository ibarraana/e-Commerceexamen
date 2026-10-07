/*
Modelo Product (products): id, name, price (float/decimal), stock (integer), category (string). 
*/

import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Producto = sequelize.define("Producto", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    }},
  {
    tableName: "products",
    timestamps: false,
  },
);

export default Producto

