import React, {useState, useRef} from 'react'
import Select from 'react-select'
const productsHardcoded = require('./DBproductsform.json')

function FormProduct() {

    // como admin poder
    // 1) Cargar un producto nuevo
    // 1)a) Form (name, photos (max 3), description, stock, selled, perc_desc, price, categories)
    // 2) Ver facilmente todos los productos y buscar por nombre o categoria para acceder al detalle y asi modificarlos o eliminarlos
    // 2)a) Ver todos los productos de una forma practia
    // 2)b) Buscar productos por nombre
    // 2)c) Buscar productos por categoria
    // 2)d) Seleccionar un producto y (form)
    //      Ver todos sus datos
    //      Modificar sus datos
    //      Borrarlo
    //
    // validar el input antes de mostrar boton de enviar y mostrar mensaje de error
    // mensaje de confirmacion al querer crear actualizar eliminar

    const [actionType, setActionType] = useState(null)
    const [input, setInput] = useState({})
    const actionOptions = [
        { value: 'create', label: 'Crear un nuevo producto' },
        { value: 'readAndModified', label: 'Ver los productos existentes, editarlos o eliminarlos' }
    ]
    // const allProducts = productsHardcoded.map(product => {
    //     return {
    //         value: product.id,
    //         label: product.name
    //     }
    // })
    // allProducts.unshift({value: '', label: ''})
    //aca iria un map de una ruta nueva del back que traiga solamente nombre y id de los productos o algun dato mas pero que no sea full para que no sea tan pesado
    // una vez que seleccionas un producto, se pide todo el detalle al back y se carga en el input del formulario para ver si queres borrarlo, editarlo o no hacer nada
    
    function handleChange(e) {
        e.preventDefault()
        const { value, name } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    return (
        <div>
            <h2>Accion que deseas realizar:</h2>
            <Select options={actionOptions}
            onChange={(e) => setActionType(e.value)}>
            </Select>
            {
                actionType === 'create' ?
                <form action="">
                    <div>
                        <input type="text"
                        name="name" 
                        placeholder="Nombre del producto"
                        value={input.name}
                        onChange={handleChange}/> 
                    </div>
                    <div>
                        <input type="text"
                        name="description"
                        placeholder="Descripcion del producto"
                        value={input.description}
                        onChange={handleChange}/> 
                    </div>
                    <div>
                        <input type="number" 
                        name="stock" 
                        placeholder="Stock actual"
                        value={input.stock}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="number"
                        name="selled"
                        placeholder="Cantidades vendidas"
                        value={input.selled}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="number"
                        name="price"
                        placeholder="Precio del producto"
                        value={input.price}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="number"
                        name="perc_desc"
                        placeholder="Porcentaje de descuento"
                        value={input.perc_desc}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <p>Drag and drop zone</p>
                        <p>Examinar comun</p>
                        <p>Imagenes ya cargadas</p>
                    </div>
                </form> :
                <p>Lista de productos y barra de busqueda</p>
            }
            
        </div>
    )
}

export default FormProduct
