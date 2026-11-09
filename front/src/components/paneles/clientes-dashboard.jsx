import { useState } from "react"
import { useAuth } from '../../contextAPI/AuthProvider'

function ClientesDashboard() {

    const usuarios = useAuth().usuarios
    const cerrarSesion = useAuth().CerrarSesion

    const [darkMode, setDarkMode] = useState(true)

    return (
        <div className={'min-h-screen w-full ' + (darkMode ? "bg-gray-900 text-white" : "bg-white text-black")}>

            <div className="flex justify-end">
                <table className="table-auto border-separate">
                    <tr>
                        <td>Cambiar modo:</td>
                        <td><button className="bg-amber-100 cursor-pointer border-3" onClick={() => setDarkMode(true)}><a class="icon-moon"/></button></td>
                        <td><button className="bg-amber-100 cursor-pointer border-3" onClick={() => setDarkMode(false)}><a class="icon-sun" /></button></td>
                    </tr>
                </table>  
            </div> 

            <h1 className="text-4xl font-bold mb-4">Bienvenido al panel de Clientes</h1>
            <br />

            <button onClick={cerrarSesion} className="bg-red-500 cursor-pointer border-3">Cerrar Sesión</button>
            
            <br /><br />

            {usuarios ? ( 
                <div>
                    <p>Usuarios: {usuarios.nombre}</p>
                    <p>Correo: { usuarios.email}</p>
                </div>
            ) : (
                <p>Cargando información del cliente...</p>
            )}

        </div>
    )
}

export default ClientesDashboard