import { useAuth } from "../../contextAPI/AuthProvider"

function AdminRolGuardaSeguridad({ allowedRoles, children }) {
    const usuarios = useAuth().usuarios
    const estaCargando = useAuth().estaCargando

    if(estaCargando) {
        return <h1>Cargando...</h1>
    }

    const datosAdmin = usuarios?.admin || usuarios;

    if(!datosAdmin || !allowedRoles.includes(datosAdmin.rol)) {
        return (
            <>
                <h2>No tienes permisos para acceder a esta página</h2>
            </>
        )
    }

    return children
}

export default AdminRolGuardaSeguridad