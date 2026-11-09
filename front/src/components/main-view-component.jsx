import { useState } from "react"
import { Link } from "react-router-dom"

function MainViewComponent() {

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
            
            <h1 className="text-5xl text-center underline decoration-red-500">Bienvenido a la pagina Ana Gabriela Ibarra</h1>
            <br />
            <h3 className="underline decoration-wavy">Debe seleccionar el modo de inicio de session</h3>
            <br />
            <table>
                <tr>
                    <td>Inicio de sesion para Clientes:</td>
                    <td><Link to="/login-clientes"><button className="bg-green-400">Iniciar sesion - Espacio Clientes</button></Link></td>
                </tr>
                <tr>
                    <td>Inicio de sesion para Administradores:</td>
                    <td><Link to="/admin/login-admin"><button className="bg-blue-400">Iniciar sesion - Espacio Administradores</button></Link></td>
                </tr>
            </table>
        </div>
    )
}

export default MainViewComponent