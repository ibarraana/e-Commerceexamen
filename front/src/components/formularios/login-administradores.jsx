import { useState } from "react";
import { useAuth } from "../../contextAPI/AuthProvider";

function LoginAdministradores() {
  const [email, setEmail] = useState("admin@tienda.com");
  const [passwordAdmin, setPasswordAdmin] = useState("admin123");

  const [darkMode, setDarkMode] = useState(true);

  const { ejecutarLoginAdmin, tipoUsuario, CerrarSesion } = useAuth();

  async function logueoAdminDato(event) {
    event.preventDefault();

    try {
      await ejecutarLoginAdmin(email, passwordAdmin);
    } catch (error) {
      window.alert("Error al iniciar sesión:", error);
    }
  }

  if (tipoUsuario === "cliente") {
    return (
      <div>      
        <div>
          <h2>Conflicto de Sesiones Detectado</h2>
          <p>Ya posee una sesión de Cliente activa en este navegador.</p>
          <p>Para ingresar al panel de Administración, debe cerrar su sesión actual.</p>
          <br />
          <button onClick={CerrarSesion}>Cerrar sesión de Cliente y continuar</button>
        </div>
      </div>
    );
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

      <h2 className="text-4xl font-bold mb-4">Iniciar sesion - Espacio Administradores</h2>

      <form onSubmit={logueoAdminDato}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-gray-100 appearance-auto border-3 text-black"/>
        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" value={passwordAdmin} onChange={(e) => setPasswordAdmin(e.target.value)} required className="bg-gray-100 appearance-auto border-3 text-black"/>
        <button type="submit" className="bg-blue-500 cursor-pointer border-3">Iniciar Sesion</button>
      </form>
    </div>
  );
}

export default LoginAdministradores;
