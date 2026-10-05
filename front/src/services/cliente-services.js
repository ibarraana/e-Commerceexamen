import api from "./index-api"

// /auth/client/login
export async function loginClient(email, passwordClient) {
    try {
        const response = await api.post('/auth/client/login', { email, passwordClient });
        return response.data;
    }
    catch (error) {
        console.error('Error en loginClient:', error.response ? error.response.data : error.message);
        throw error.response.data;
    }
}

export async function getPerfilCliente(token) {
    try {
        const response = await api.get('/client/perfil', {  
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error en getPerfilCliente:', error.response ? error.response.data : error.message);
        throw error.response.data;
    }
}