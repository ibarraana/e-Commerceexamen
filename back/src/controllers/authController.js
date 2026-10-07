import jwt from 'jsonwebtoken';
import { Admin, Client } from '../models/index.js';

// POST /api/auth/refresh
export async function verificarYRenovarToken(req, res) {
    try {
        const refreshTokenRecibido = req.body.refreshToken;

        if (!refreshTokenRecibido) {
            return res.status(400).json({ message: "Refresh token requerido." });
        }

        // 1. Verificar la firma del Refresh Token recibido
        const decodificado = jwt.verify(refreshTokenRecibido, process.env.JWT_SECRET || 'secretkey_tienda');

        let usuarioEncontrado = null;

        // 2. Buscar en la tabla correspondiente según el tipo contenido en el token
        if (decodificado.type === 'admin') {
            usuarioEncontrado = await Admin.findOne({ where: { id: decodificado.id, refreshToken: refreshTokenRecibido } });
        } else if (decodificado.type === 'client') {
            usuarioEncontrado = await Client.findOne({ where: { id: decodificado.id, refreshToken: refreshTokenRecibido } });
        }

        // Si no se encuentra el usuario o el token no coincide con el de la base de datos
        if (!usuarioEncontrado) {
            return res.status(401).json({ message: "Sesión inválida o expirada." });
        }

        // 3. Emitir un nuevo Access Token limpio de 15 minutos
        const nuevoAccessToken = jwt.sign(
            { 
                id: usuarioEncontrado.id, 
                type: decodificado.type, 
                rol: usuarioEncontrado.rol || null 
            },
            process.env.JWT_SECRET || 'secretkey_tienda',
            { expiresIn: '15m' }
        );

        return res.json({
            token: nuevoAccessToken
        });

    } catch (error) {
        return res.status(401).json({ message: "Token inválido o manipulado.", error: error.message });
    }
}

// POST /api/auth/logout
export async function invalidarSesionBackend(req, res) {
    try {
        const refreshTokenRecibido = req.body.refreshToken;

        if (!refreshTokenRecibido) {
            return res.status(400).json({ message: "Refresh token requerido para cerrar sesión." });
        }

        // Buscamos y borramos el token en ambas tablas de forma clásica
        const admin = await Admin.findOne({ where: { refreshToken: refreshTokenRecibido } });
        if (admin) {
            await admin.update({ refreshToken: null });
        }

        const client = await Client.findOne({ where: { refreshToken: refreshTokenRecibido } });
        if (client) {
            await client.update({ refreshToken: null });
        }

        return res.json({ message: "Sesión cerrada de forma segura en el servidor." });
    } catch (error) {
        return res.status(500).json({ message: "Error al cerrar sesión", error: error.message });
    }
}
