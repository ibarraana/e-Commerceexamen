import { useState, useEffect } from "react"
import { getProductosCatalogo } from "../../../services/producto-service"


function ProductosSeccion() {
    const [listaProductos, setListaProductos] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [inputBusqueda, setInputBusqueda] = useState("");
    const [busquedaConfirmada, setBusquedaConfirmada] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [ordenPrecio, setOrdenPrecio] = useState("");

    useEffect(function () {
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
        cargarDatos();
    }, [paginaActual, busquedaConfirmada, categoriaSeleccionada, ordenPrecio]);

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
            <h2>Catálogo de Productos</h2>

            <section>
                <form onSubmit={manejarBusqueda}>
                    <label htmlFor="buscar">Buscar producto: </label>
                    <input 
                        type="text" 
                        id="buscar" 
                        value={inputBusqueda} 
                        onChange={function (e) { setInputBusqueda(e.target.value); }} 
                        placeholder="Escriba y presione Enter o el botón"
                    />
                    <button type="submit">Buscar</button>
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
                >
                    <option value="">Sin orden específico</option>
                    <option value="ASC">Precio: Menor a mayor</option>
                    <option value="DESC">Precio: Mayor a menor</option>
                </select>
            </section>

            <br /><hr /><br />

            {listaProductos.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
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