export function checkRolAdmin(allowedRoles) {

    return function (req, res, next) {
        if(!req.user) {
            return res.status(401).json({ message: 'Acceso denegado: Usuario no autenticado' });
        }

        if(!allowedRoles.includes(req.user.rol)) {
            return res.status(401).json({
                message: 'Acceso denegado: Se requiere uno de los siguientes roles: ' + allowedRoles.join(', ')
            })
        }

        next()
    }
}