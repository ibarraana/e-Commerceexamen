import { useAuth } from '../../contextAPI/AuthProvider'

function AdminDashboard() {

    const usuarios = useAuth().usuarios
    const cerrarSesion = useAuth().CerrarSesion

    return (
        <div>
            <h1>Bienvenido al panel de administración</h1>
            <br />

            <button onClick={cerrarSesion}>Cerrar Sesión</button>
            
            <br /><br />

            {usuarios ? ( 
                <div>
                    <p>Usuarios: {usuarios.nombre}</p>
                    <p>Correo: { usuarios.email}</p>
                </div>
            ) : (
                <p>Cargando información del administrador...</p>
            )}

        </div>
    )
}

export default AdminDashboard