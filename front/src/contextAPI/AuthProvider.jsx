import { createContext, useState, useEffect, useContext } from "react"

import { loginAdmin, getAdminMetricas } from "../services/admin-services"
import { loginCliente, getPerfilCliente } from "../services/cliente-services"

const AuthContext = createContext()

function AuthProvider({ children }) {
    return (
        <>
        </>
    )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)



