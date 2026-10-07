import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
})  

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  const peticionOriginal = error.config;
  
  if (error.response && error.response.status === 401 && !peticionOriginal._retry) {
    peticionOriginal._retry = true; 
    
    try {
      const tokenDeLargaDuracion = localStorage.getItem("refreshToken");
      
      if (tokenDeLargaDuracion) {
        const respuesta = await axios.post(import.meta.env.VITE_BACKEND_URL + "/auth/refresh", {
          refreshToken: tokenDeLargaDuracion
        });
        
        const nuevoToken = respuesta.data.token;
        localStorage.setItem("token", nuevoToken);
        
        peticionOriginal.headers.Authorization = "Bearer " + nuevoToken;
        return api(peticionOriginal);
      }
    } catch (errorRefresh) {
      console.error("No se pudo renovar la sesión de forma automática:", errorRefresh);
      localStorage.clear()
      window.location.href = "/"
    }
  }
  
  return Promise.reject(error);
});

export default api