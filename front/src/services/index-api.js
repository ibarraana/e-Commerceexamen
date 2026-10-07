import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
})  

// Interceptor para inyectar automáticamente el Bearer token si existe en localStorage
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Interceptor de respuesta para refrescar el token automáticamente ante un 401
api.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const peticionOriginal = error.config;
  
  // Si el servidor responde 401 y no habíamos reintentado aún esta petición
  if (error.response && error.response.status === 401 && !peticionOriginal._retry) {
    peticionOriginal._retry = true; // Marcamos para no entrar en un bucle infinito
    
    try {
      const tokenDeLargaDuracion = localStorage.getItem("refreshToken");
      
      if (tokenDeLargaDuracion) {
        // Solicitamos un nuevo Access Token enviando el refreshToken al endpoint público
        const respuesta = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/refresh", {
          refreshToken: tokenDeLargaDuracion
        });
        
        const nuevoToken = respuesta.data.token;
        localStorage.setItem("token", nuevoToken);
        
        // Actualizamos el header de la petición que había fallado y la volvemos a lanzar
        peticionOriginal.headers.Authorization = "Bearer " + nuevoToken;
        return api(peticionOriginal);
      }
    } catch (errorRefresh) {
      console.error("No se pudo renovar la sesión de forma automática:", errorRefresh);
      // Si el refresh token también expiró, limpiamos el localStorage de forma nativa
      localStorage.clear()
      window.location.href = "/"
    }
  }
  
  return Promise.reject(error);
});

export default api