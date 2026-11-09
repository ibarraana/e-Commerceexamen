import api from "./index-api"

export async function getProductosCatalogo(page, search, category, order) {
    try {
        let url = "/products?page=" + page + "&limit=5";

        if (search) {
            url = url + "&search=" + search;
        }
        if (category) {
            url = url + "&category=" + category;
        }
        if (order) {
            url = url + "&sortBy=price&order=" + order;
        }

        const response = await api.get(url);
        return response.data; // Retorna { count, totalPages, currentPage, products }
    } catch (error) {
        console.error("Error en getProductosCatalogo:", error);
        throw error;
    }
}

export async function eliminarProducto(productId) {
    try {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error en eliminarProducto:", error);
        throw error;
    }
}

export async function crearProducto(nuevoProducto) {
    try {
        const response = await api.post("/products", nuevoProducto);
        return response.data;
    } catch (error) {
        console.error("Error en crearProducto:", error);
        throw error;
    }
}



