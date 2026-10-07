import { Op } from "sequelize";
import { Producto } from '../models/index.js';

// GET /api/products (Paginado, Ordenado y Filtrado)
export async function getProducts(req, res) {
    try {
        let page = parseInt(req.query.page);
        if (!page) {
            page = 1;
        }

        let limit = parseInt(req.query.limit);
        if (!limit) {
            limit = 5;
        }

        const search = req.query.search;
        const category = req.query.category;
        const sortBy = req.query.sortBy;
        const order = req.query.order;

        const offset = (page - 1) * limit;

        const dondeFiltros = {};

        if (search) {
            dondeFiltros.nombre = { [Op.like]: "%" + search + "%" };
        }

        if (category) {
            dondeFiltros.categoria = category;
        }

        let columnaOrden = "id";
        let direccionOrden = "ASC";

        if (sortBy === "precio" || sortBy === "nombre") {
            columnaOrden = sortBy;
        }

        if (order === "DESC") {
            direccionOrden = "DESC";
        }

        const result = await Producto.findAndCountAll({
            where: dondeFiltros,
            order: [[columnaOrden, direccionOrden]],
            limit: limit,
            offset: offset
        });

        const totalPages = Math.ceil(result.count / limit);

        return res.json({
            count: result.count,
            totalPages: totalPages,
            currentPage: page,
            products: result.rows
        });

    } catch (error) {
        return res.status(500).json({ message: "Error al obtener productos", error: error.message });
    }
}

// POST /api/products (Crear)
export async function createProduct(req, res) {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const stock = req.body.stock;
        const category = req.body.category;

        const newProduct = await Producto.create({ 
            nombre: name, 
            precio: price, 
            stock: stock, 
            categoria: category 
        });

        return res.status(201).json({ message: "Producto creado con éxito", product: newProduct });
    } catch (error) {
        return res.status(500).json({ message: "Error al crear producto", error: error.message });
    }
}

// PUT /api/products/:id (Editar)
export async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const stock = req.body.stock;
        const category = req.body.category;

        const product = await Producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        await product.update({ 
            nombre: name, 
            precio: price, 
            stock: stock, 
            categoria: category 
        });

        return res.json({ message: "Producto actualizado con éxito", product: product });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar producto", error: error.message });
    }
}

export async function deleteProduct(req, res) {
    try {
        const id = req.params.id;

        const product = await Producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        await product.destroy();

        return res.json({ message: "Producto eliminado correctamente de la base de datos." });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar producto", error: error.message });
    }
}
