import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';

// POST /api/auth/client/login
export const loginClient = async (req, res) => {
    try {
        const { email, password } = req.body;

        const client = await Client.findOne({ where: { email } });
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado.' });
        }

        const validPassword = await bcrypt.compare(password, client.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar Token JWT con payload { id, type: 'client' }
        const token = jwt.sign(
            { id: client.id, type: 'client' },
            process.env.JWT_SECRET || 'secretkey_tienda',
            { expiresIn: '2h' }
        );

        return res.json({
            message: 'Login exitoso como Cliente',
            token
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// GET /api/client/perfil
export const getClientProfile = async (req, res) => {
    try {
        const client = await Client.findByPk(req.user.id, {
            attributes: { exclude: ['password'] } // No retornar contraseña
        });

        if (!client) {
            return res.status(404).json({ message: 'Perfil no encontrado.' });
        }

        return res.json(client);
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};