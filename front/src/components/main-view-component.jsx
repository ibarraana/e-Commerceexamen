import { Link } from "react-router-dom"

function MainViewComponent() {
    return (
        <div className="bg-neutral-950 text-white">
            <button>Luna</button>
            <button>Sol</button>

            <h1>Bienvenido a la pagina Ana Gabriela Ibarra</h1>
            <br />
            <h3>Debe seleccionar el modo de inicio de session</h3>
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