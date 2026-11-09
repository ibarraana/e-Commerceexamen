import { useState } from "react"
import { useAuth } from "../../contextAPI/AuthProvider"

function LoginClientes() {

    const [email, setEmail] = useState("cliente@tienda.com")
    const [passwordCliente, setPasswordCliente] = useState("cliente123")

    const [darkMode, setDarkMode] = useState(true)

    const { ejecutarLoginCliente, tipoUsuario, CerrarSesion } = useAuth()

    async function logueoClienteDato(event) {
        event.preventDefault();
        
        try {
            await ejecutarLoginCliente(email, passwordCliente);
        } catch (error) {
            window.alert("Error al iniciar sesion:", error);
        }
    }

    if (tipoUsuario === "admin") {
        return (
            <div>
                <h2>Conflicto de Sesiones Detectado</h2>
                <p>Ya posee una sesión de Administrador activa en este navegador.</p>
                <p>Para ingresar al portal de Clientes, debe cerrar su sesión de operador actual.</p>
                <br />
                <button onClick={CerrarSesion}>Cerrar sesión de Administrador y continuar</button>
            </div>
        )
    }

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

            <h2 className="text-4xl font-bold mb-4">Iniciar sesion - Espacio Clientes</h2>

            <form onSubmit={ logueoClienteDato } >
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-gray-100 appearance-auto border-3 text-black"/>
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={passwordCliente} onChange={(e) => setPasswordCliente(e.target.value)} required className="bg-gray-100 appearance-auto border-3 text-black" />
                <button type="submit" className="bg-blue-500 cursor-pointer">Iniciar Sesion</button>
            </form>
        </div>
    )
}

export default LoginClientes;
