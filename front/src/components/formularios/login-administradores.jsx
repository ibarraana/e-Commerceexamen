import { useState } from "react"
import { useAuth } from "../../contextAPI/AuthProvider"

function LoginAdministradores() {

    const [email, setEmail] = useState("admin@tienda.com")
    const [passwordAdmin, setPasswordAdmin] = useState("admin123")

    const { ejecutarLoginAdmin } = useAuth()


    async function logueoAdminDato(event) {
        event.preventDefault();
        
        try {
            await ejecutarLoginAdmin(email, passwordAdmin);
        } catch (error) {
            window.alert("Error al iniciar sesion:", error);
        }
    }

    return (
        <div>
            <h2>Iniciar sesion - Espacio Administradores</h2>

            <form onSubmit={ logueoAdminDato } >
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Contraseña:</label>
                <input type="password" id="password" value={passwordAdmin} onChange={(e) => setPasswordAdmin(e.target.value)} required />
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
    )
}

export default LoginAdministradores