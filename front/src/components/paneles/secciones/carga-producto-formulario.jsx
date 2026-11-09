import { useState } from "react";
import { crearProducto, editarProducto } from "../../../services/producto-service";

function CargaProductoFormulario({ onProductoCreado, onCancelar }) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("");

    async function manejarSubmit(event) {
        event.preventDefault();

        const nuevoProducto = {
            name: nombre,
            price: parseFloat(precio),
            stock: parseInt(stock),
            category: categoria
        };

        try {
            await crearProducto(nuevoProducto);
            alert("Producto creado con éxito");
            onProductoCreado(); 
        } catch (error) {
            alert("Hubo un error al intentar crear el producto");
        }
    }

    return (
        <div>
            <h3 className="text-xl font-bold mb-3">Nuevo Producto</h3>
            <form onSubmit={manejarSubmit}>
                
                <label>Nombre:</label>
                <input type="text" required value={nombre} onChange={function(e) { setNombre(e.target.value); }} className="bg-gray-100 appearance-auto border-3 text-black"   />
                <br />
                
                <label>Precio:</label>
                <input type="number" step="0.01" required value={precio} onChange={function(e) { setPrecio(e.target.value); }} className="bg-gray-100 appearance-auto border-3 text-black" />
                <br />
                
                <label>Stock:</label>
                <input type="number" required value={stock} onChange={function(e) { setStock(e.target.value); }} className="bg-gray-100 appearance-auto border-3 text-black" />
                <br />
                
                <label>Categoría:</label>
                <select required value={categoria}  onChange={function(e) { setCategoria(e.target.value); }} className="bg-gray-100 appearance-auto border-3 text-black">
                    <option value="">Seleccione una...</option>
                    <option value="Periféricos">Periféricos</option>
                    <option value="Monitores">Monitores</option>
                    <option value="Audio">Audio</option>
                    <option value="Componentes">Componentes</option>
                </select>
                <br />

                <button type="submit" className="bg-green-500 cursor-pointer border-3">Guardar Producto</button>
                <button type="button" onClick={onCancelar} className="bg-red-500 cursor-pointer border-3">Cancelar</button>
                <br /><br /><br />
            </form>
        </div>
    );
}

export default CargaProductoFormulario;
