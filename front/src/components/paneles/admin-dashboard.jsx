import { useState } from 'react';
import { useAuth } from '../../contextAPI/AuthProvider';
import AdminRolGuardaSeguridad from '../ruteos/admin-rol-guarda-seguridad';

import UsuariosSeccion from './secciones/usuario-seccion';
import ProductosSeccion from './secciones/productos-seccion';
import ReportesSeccion from './secciones/reportes-seccion';


function AdminDashboard() {

    const { usuarios, CerrarSesion } = useAuth();
    const [seccionActiva, setSeccionActiva] = useState('inicio');

    const datosAdmin = usuarios?.admin || usuarios;

    return (
        <div>
            
            <nav>
                <h3>Portal Administrativo</h3>
                {datosAdmin && (
                    <div>
                        <p>Operador: {datosAdmin.nombre}</p>
                        <p>Rol: <strong>{datosAdmin.rol}</strong></p>
                    </div>
                )}
                <hr />
                
                <ul>
                    <li>
                        <button onClick={() => setSeccionActiva('inicio')}>Inicio</button>
                    </li>

                    {datosAdmin?.rol === 'superadmin' && (
                        <li>
                            <button onClick={() => setSeccionActiva('usuarios')}>Ver Usuarios</button>
                        </li>
                    )}

                    {['superadmin', 'gestor_productos'].includes(datosAdmin?.rol) && (
                        <li>
                            <button onClick={() => setSeccionActiva('productos')}>Gestionar Productos</button>
                        </li>
                    )}

                    {['superadmin', 'auditor'].includes(datosAdmin?.rol) && (
                        <li>
                            <button onClick={() => setSeccionActiva('reportes')}>Ver Reportes</button>
                        </li>
                    )}
                </ul>

                <button onClick={CerrarSesion}>Cerrar Sesión</button>
            </nav>

            <main>
                {seccionActiva === 'inicio' && (
                    <div>
                        <h1>Bienvenido al Panel de Control</h1>
                        <p>Utilice la barra lateral izquierda para acceder a los módulos asignados a su credencial.</p>
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



