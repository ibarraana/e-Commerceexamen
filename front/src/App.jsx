import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthProvider from './contextAPI/AuthProvider'

import MainViewComponent from './components/main-view-component'
import LoginClientes from './components/formularios/login-clientes'
import LoginAdministradores from './components/formularios/login-administradores'
import AdminDashboard from './components/paneles/admin-dashboard'

import './App.css'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainViewComponent />} />
          <Route path="/login-clientes" element={<LoginClientes />} />
          <Route path="/admin/login-admin" element={<LoginAdministradores />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>        
      </AuthProvider>
    </Router>
  )
}

export default App
