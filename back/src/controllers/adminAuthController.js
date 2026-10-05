import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

// POST /api/auth/admin/login
export const loginAdmin = async (req, res) => {
    try {
        const { email, passwordAdmin } = req.body;

        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).json({ message: 'Administrador no encontrado.' });
        }

        const validPassword = await bcrypt.compare(passwordAdmin, admin.passwordAdmin);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar Token JWT con payload { id, type: 'admin' }
        const token = jwt.sign(
            { id: admin.id, type: 'admin' },
            process.env.JWT_SECRET || 'secretkey_tienda',
            { expiresIn: '2h' }
        );

        return res.json({
            message: 'Login exitoso como Admin',
            token
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// GET /api/admin/metricas
export const getAdminMetrics = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.user.id, {
            attributes: { exclude: ['passwordAdmin'] }
        });

        return res.json({
            message: 'Bienvenido al panel administrativo',
            admin,
            metricas: {
                ventasTotales: 1500,
                usuariosRegistrados: 45,
                estadoSistema: 'OK'
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};