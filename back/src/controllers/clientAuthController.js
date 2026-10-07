import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Client } from "../models/index.js";

// POST /api/auth/client/login
export const loginClient = async (req, res) => {
  try {
    const { email, passwordClient } = req.body;

    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado." });
    }

    const validPassword = await bcrypt.compare(
      passwordClient,
      client.passwordClient,
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    const token = jwt.sign(
      { id: client.id, type: "client" },
      process.env.JWT_SECRET || "secretkey_tienda",
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { id: client.id, type: "client" },
      process.env.JWT_SECRET || "secretkey_tienda",
      { expiresIn: "7d" },
    );

    await client.update({ refreshToken: refreshToken });

    return res.json({
      message: "Login exitoso como Cliente",
      token,
      refreshToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// GET /api/client/perfil
export const getClientProfile = async (req, res) => {
  try {
    const client = await Client.findByPk(req.user.id, {
      attributes: { exclude: ["passwordClient"] }, // No retornar contraseña
    });

    if (!client) {
      return res.status(404).json({ message: "Perfil no encontrado." });
    }

    return res.json(client);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};
