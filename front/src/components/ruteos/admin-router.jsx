import { Navigate } from "react-router-dom"
import { useAuth } from "../../contextAPI/AuthProvider"

function AdminRouter({ children }) {

    const token = useAuth().token
    const tipoUsuario = useAuth().tipoUsuario
    const estaCargando = useAuth().estaCargando

    if(estaCargando) {
        return <h1>Cargando...</h1>
    }

    if(!token) {
        return <Navigate to="/admin/login-admin" replace />
    }

    if(tipoUsuario !== "admin") {
        return <Navigate to="/admin/dashboard" replace />
    }

    return children
}

export default AdminRouter
