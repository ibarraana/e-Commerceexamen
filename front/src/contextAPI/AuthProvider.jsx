import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { loginAdmin, getAdminMetricas } from "../services/admin-services"
import { loginCliente, getPerfilCliente } from "../services/cliente-services"

const AuthContext = createContext()

function AuthProvider({ children }) {

    const [usuarios, setUsuarios] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem("tipoUsuario") || null)
    const [estaCargando, setEstaCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(function () {
        async function verificarInicioSession() {
           const tokenExistente = localStorage.getItem("token");
           const tipoExistente = localStorage.getItem("tipoUsuario");

           if (tokenExistente && tipoExistente) {
                if (tipoExistente === "admin") {
                    try {
                        const metricas = await getAdminMetricas(tokenExistente);
                        setUsuarios(metricas);
                    } catch (error) {
                        console.error("Error al obtener métricas en persistencia:", error);
                        CerrarSesion(); // Si el token falló, limpiamos de forma segura
                    }
                } else if (tipoExistente === "cliente") {
                    try {
                        const perfil = await getPerfilCliente(tokenExistente);
                        setUsuarios(perfil);
                    } catch (error) {
                        console.error("Error al obtener perfil en persistencia:", error);
                        CerrarSesion();
                    }
                }
            }

            setEstaCargando(false);
        }
        verificarInicioSession();
    }, [token, tipoUsuario]);

    async function ejecutarLoginAdmin(email, passwordAdmin) {
        setEstaCargando(true);
        try {
            const data = await loginAdmin(email, passwordAdmin);

            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken); 
            localStorage.setItem("tipoUsuario", "admin");

            setToken(data.token);
            setTipoUsuario("admin");

            const datosMetricasAdmin = await getAdminMetricas(data.token);
            setUsuarios(datosMetricasAdmin);

            navigate("/admin/dashboard");
        }
        catch (error) {
            setEstaCargando(false);
            console.error("Error al iniciar sesión como admin:", error);
            throw error;
        }
    }
    
    async function ejecutarLoginCliente(email, passwordCliente) {
        setEstaCargando(true);
        try {
            const data = await loginCliente(email, passwordCliente);

            localStorage.setItem("token", data.token);
            localStorage.setItem("refreshToken", data.refreshToken); 
            localStorage.setItem("tipoUsuario", "cliente");

            setToken(data.token);
            setTipoUsuario("cliente");

            const datosPerfilCliente = await getPerfilCliente(data.token);
            setUsuarios(datosPerfilCliente);

            navigate("/clientes/dashboard");
        }
        catch (error) {
            setEstaCargando(false);
            console.error("Error al iniciar sesión como cliente:", error);
            throw error;
        }
    }

    function CerrarSesion() {
        navigate("/", { replace: true });
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken"); 
        localStorage.removeItem("tipoUsuario");
        setToken(null);
        setTipoUsuario(null);
        setUsuarios(null);
        setEstaCargando(false);
    }

    return (
        <AuthContext.Provider value={{ usuarios, token, tipoUsuario, estaCargando, ejecutarLoginAdmin, ejecutarLoginCliente, CerrarSesion }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

