import { useState } from "react"
import { useAuth } from "../../contextAPI/AuthProvider"

function LoginClientes() {

    const [email, setEmail] = useState("cliente@tienda.com")
    const [passwordCliente, setPasswordCliente] = useState("cliente123")

    // Extraemos las variables necesarias para controlar la colisión de entornos
    const { ejecutarLoginCliente, tipoUsuario, CerrarSesion } = useAuth()

    async function logueoClienteDato(event) {
        event.preventDefault();
        
        try {
            await ejecutarLoginCliente(email, passwordCliente);
        } catch (error) {
            window.alert("Error al iniciar sesion:", error);
        }
    }

    // INTERCEPCIÓN DE SEGURIDAD: Evita la colisión si ya opera una sesión de administrador
    if (tipoUsuario === "admin") {
        return (
            <div>
                <h2>Conflicto de Sesiones Detectado</h2>
                <p>Ya posee una sesión de Administrador activa en este navegador.</p>
                <p>Para ingresar al portal de Clientes, debe cerrar su sesión de operador actual.</p>
                <br />
                {/* Botón directo para limpiar localStorage y evitar cruces de datos en memoria */}
                <button onClick={CerrarSesion}>Cerrar sesión de Administrador y continuar</button>
            </div>
        )
    }

    // Si el entorno está libre de conflictos, renderiza tu formulario tradicional
    return (
        <div>
            <h2>Iniciar sesion - Espacio Clientes</h2>

            <form onSubmit={ logueoClienteDato } >
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={passwordCliente} onChange={(e) => setPasswordCliente(e.target.value)} required />
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
    )
}

export default LoginClientes;
