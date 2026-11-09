import { useState } from "react";
import { crearProducto, editarProducto } from "../../../services/producto-service";

function CargaProductoFormulario({ producto, onProductoCreado, onCancelar }) {

    const [nombre, setNombre] = useState(producto?.nombre || "");
    const [precio, setPrecio] = useState(producto?.precio || "");
    const [stock, setStock] = useState(producto?.stock || "");
    const [categoria, setCategoria] = useState(producto?.categoria || "");

    const esEdicion = producto && producto.id; 

    async function manejarSubmit(event) {
        event.preventDefault();

        const datosProducto = {
            name: nombre,
            price: parseFloat(precio),
            stock: parseInt(stock),
            category: categoria
        };

        try {
            if (esEdicion) {
                datosProducto.id = producto.id;
                await editarProducto(datosProducto);
                alert("Producto actualizado con éxito");
            } else {
                await crearProducto(datosProducto);
                alert("Producto creado con éxito");
            }
            onProductoCreado(); 
        } catch (error) {
            alert("Hubo un error al intentar procesar el producto");
        }
    }

    return (
        <div>
            <h3 className="text-xl font-bold mb-3">{esEdicion ? "Editar Producto" : "Nuevo Producto"}</h3>
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
