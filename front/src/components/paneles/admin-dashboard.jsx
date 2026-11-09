import { useState } from 'react';
import { useAuth } from '../../contextAPI/AuthProvider';
import AdminRolGuardaSeguridad from '../ruteos/admin-rol-guarda-seguridad';

import UsuariosSeccion from './secciones/usuario-seccion';
import ProductosSeccion from './secciones/productos-seccion';
import ReportesSeccion from './secciones/reportes-seccion';


function AdminDashboard() {

    const { usuarios, CerrarSesion } = useAuth();
    const [seccionActiva, setSeccionActiva] = useState('inicio');

    const [darkMode, setDarkMode] = useState(true)

    const datosAdmin = usuarios?.admin || usuarios;

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
            
            <nav>
                <h3 className="text-4xl font-bold mb-4">Portal Administrativo</h3>
                {datosAdmin && (
                    <div>
                        <p>Operador: {datosAdmin.nombre}</p>
                        <p>Rol: <strong>{datosAdmin.rol}</strong></p>
                    </div>
                )}

                <hr />
                
                <ul>
                    <li>
                        <button onClick={() => setSeccionActiva('inicio')} className="bg-blue-500 cursor-pointer border-3">Inicio</button>
                    </li>

                    {datosAdmin?.rol === 'superadmin' && (
                        <li>
                            <button onClick={() => setSeccionActiva('usuarios')} className="bg-green-500 cursor-pointer border-3">Ver Usuarios</button>
                        </li>
                    )}

                    {['superadmin', 'gestor_productos'].includes(datosAdmin?.rol) && (
                        <li>
                            <button onClick={() => setSeccionActiva('productos')} className="bg-orange-500-500 cursor-pointer border-3">Gestionar Productos</button>
                        </li>
                    )}

                    {['superadmin', 'auditor'].includes(datosAdmin?.rol) && (
                        <li>
                            <button onClick={() => setSeccionActiva('reportes')} className="bg-gray-500 cursor-pointer border-3">Ver Reportes</button>
                        </li>
                    )}
                </ul>

                <button onClick={CerrarSesion} className="bg-red-500 cursor-pointer border-3">Cerrar Sesión</button>
            </nav>

            <main>
                {seccionActiva === 'inicio' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Bienvenido al Panel de Control</h1>
                        <p className="text-2xl font-sans mb-4">Seleccione la accion a realizar</p>
                    </div>
                )}

                {seccionActiva === 'usuarios' && (
                    <AdminRolGuardaSeguridad allowedRoles={['superadmin']}>
                        <UsuariosSeccion />
                    </AdminRolGuardaSeguridad>
                )}

                {seccionActiva === 'productos' && (
                    <AdminRolGuardaSeguridad allowedRoles={['superadmin', 'gestor_productos']}>
                        <ProductosSeccion />
                    </AdminRolGuardaSeguridad>
                )}

                {seccionActiva === 'reportes' && (
                    <AdminRolGuardaSeguridad allowedRoles={['superadmin', 'auditor']}>
                        <ReportesSeccion />
                    </AdminRolGuardaSeguridad>
                )}
            </main>

        </div>
    );
}

export default AdminDashboard



