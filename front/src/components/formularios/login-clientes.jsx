import { useState } from "react"
import { useAuth } from "../../contextAPI/AuthProvider"


function LoginClientes() {

    const [email, setEmail] = useState("cliente@tienda.com")
    const [passwordCliente, setPasswordCliente] = useState("cliente123")

    const { ejecutarLoginCliente } = useAuth()


    async function logueoClienteDato(event) {
        event.preventDefault();
        
        try {
            await ejecutarLoginCliente(email, passwordCliente);
        } catch (error) {
            window.alert("Error al iniciar sesion:", error);
        }
    }

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

export default LoginClientes