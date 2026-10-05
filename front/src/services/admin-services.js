import api from "./index-api"

export async function loginAdmin(email, passwordAdmin) {
    try {
        const response = await api.post("/auth/admin/login", { email, passwordAdmin })
        return response.data
    } catch (error) {
        console.error("Error logging in admin:", error)
        throw error
    }
}

export async function getAdminMetricas(token) {
    try {
        const response = await api.get("/admin/metricas", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data
    }
    catch (error) {
        console.error("Error fetching admin metrics:", error)
        throw error
    }    
}




