import { useState, useEffect } from "react"
import { getProductosCatalogo, eliminarProducto, crearProducto  } from "../../../services/producto-service"
import CargaProductoFormulario from "./carga-producto-formulario"; 


function ProductosSeccion() {
    const [listaProductos, setListaProductos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [inputBusqueda, setInputBusqueda] = useState("");
    const [busquedaConfirmada, setBusquedaConfirmada] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [ordenPrecio, setOrdenPrecio] = useState("");

    const [mostrarFormulario, setMostrarFormulario] = useState(false);


    async function cargarDatos() {
        try {
            const data = await getProductosCatalogo(
                paginaActual,
                busquedaConfirmada,
                categoriaSeleccionada,
                ordenPrecio
            );
            setListaProductos(data.products);
            setTotalPaginas(data.totalPages);
        } catch (error) {
            console.error("Error al cargar los productos en la vista:", error);
        }
    }

    useEffect(function () {
        cargarDatos();
    }, [paginaActual, busquedaConfirmada, categoriaSeleccionada, ordenPrecio]);

    async function manejarEliminar(id) {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmar) return;

        try {
            await eliminarProducto(id);
            await cargarDatos(); 
            alert("Producto eliminado con éxito");
        } catch (error) {
            alert("Hubo un error al intentar eliminar el producto");
        }
    }

    function manejarBusqueda(event) {
        event.preventDefault();
        setPaginaActual(1); 
        setBusquedaConfirmada(inputBusqueda);
    }

    function paginaAnterior() {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    }

    function paginaSiguiente() {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Catálogo de Productos</h2>

            <section>
                <form onSubmit={manejarBusqueda}>
                    <label htmlFor="buscar">Buscar producto: </label>
                    <input 
                        type="text" 
                        id="buscar" 
                        value={inputBusqueda} 
                        onChange={function (e) { setInputBusqueda(e.target.value); }} 
                        placeholder="Escriba y presione Enter o el botón"
                        className="bg-gray-100 appearance-auto border-3 text-black"                        
                    />
                    <button type="submit" className="bg-blue-500 cursor-pointer border-3">Buscar</button>
                </form>
                <br />

                <label htmlFor="categoria">Filtrar por categoría: </label>
                <select 
                    id="categoria" 
                    value={categoriaSeleccionada} 
                    onChange={function (e) { 
                        setPaginaActual(1); 
                        setCategoriaSeleccionada(e.target.value); 
                    }}
                    className="justify-center text-black bg-white border-3"
                >
                    <option value="">Todas las categorías</option>
                    <option value="Periféricos">Periféricos</option>
                    <option value="Monitores">Monitores</option>
                    <option value="Audio">Audio</option>
                    <option value="Componentes">Componentes</option>
                </select>
                <br /><br />

                <label htmlFor="orden">Ordenar por precio: </label>
                <select 
                    id="orden" 
                    value={ordenPrecio} 
                    onChange={function (e) { 
                        setPaginaActual(1); 
                        setOrdenPrecio(e.target.value); 
                    }}
                    className="justify-center text-black bg-white border-3"
                >
                    <option value="">Sin orden específico</option>
                    <option value="ASC">Precio: Menor a mayor</option>
                    <option value="DESC">Precio: Mayor a menor</option>
                </select>

                
                <br /><br /><br />
                <button className="bg-green-500 cursor-pointer border-3" onClick={function() { setMostrarFormulario(true); }}>Cargar producto</button>
            </section>

            <br /><hr /><br />

            {mostrarFormulario && (
                <CargaProductoFormulario onProductoCreado={async function() {
                    await cargarDatos();         
                    setMostrarFormulario(false);  
                }} 
                onCancelar={function() {
                    setMostrarFormulario(false);  
            }}/>
            )}

            {listaProductos.length > 0 ? (
                <table className="justify-center text-black bg-white border-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProductos.map(function (producto) {
                            return (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.categoria}</td>
                                    <td>${producto.precio}</td>
                                    <td>{producto.stock} u.</td>
                                    <td>                                       
                                        <button className="bg-red-500 cursor-pointer border-3 text-white" onClick={function() { manejarEliminar(producto.id); }}>
                                            Eliminar producto
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No se encontraron productos con los filtros seleccionados.</p>
            )}

            <br /><br />

            <nav>
                <button onClick={paginaAnterior} disabled={paginaActual === 1}>
                    Anterior
                </button>

                <span> Página {paginaActual} de {totalPaginas} </span>

                <button onClick={paginaSiguiente} disabled={paginaActual === totalPaginas}>
                    Siguiente
                </button>
            </nav>
        </div>
    );
}

export default ProductosSeccion;
