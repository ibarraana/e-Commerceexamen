export const isClient = (req, res, next) => {
    if (req.user && req.user.type === 'client') {
        next();
    } else {
        return res.status(403).json({ message: 'Acceso denegado: Se requieren permisos de cliente.' });
    }
};