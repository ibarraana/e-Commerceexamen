import { Navigate } from "react-router-dom"
import { useAuth } from "../../contextAPI/AuthProvider"

function ClienteRouter({ children }) {

    const token = useAuth().token
    const tipoUsuario = useAuth().tipoUsuario
    const estaCargando = useAuth().estaCargando

    if(estaCargando) {
        return <h1>Cargando...</h1>
    }

    if(!token) {
        return <Navigate to="/" replace />
    }

    if(tipoUsuario !== "cliente") {
        return <Navigate to="/admin/dashboard" replace />
    }

    return children
}

export default ClienteRouter
