import React, {useState} from 'react'
import Select from 'react-select'

function FormProduct() {

    // como admin poder
    // 1) cargar un producto nuevo
    // 1)a) form (name, photos (max 3), description, stock, selled, perc_desc, price, category)
    // 2) ver facilmente todos los productos y buscar por nombre o categoria para acceder al detalle y asi modificarlos o eliminarlos
    // 2)a) ver todos los productos de una forma practica
    // 2)b) buscar productos por nombre
    // 2)c) buscar productos por categoria
    // 2)d) seleccionar un producto y (form)
    //      ver todos sus datos
    //      modificar sus datos
    //      borrarlo
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
                // form para crear producto nuevo
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
                // barra de busqueda y lista de productos existentes
                <p>Lista de productos y barra de busqueda</p>
            }
            
        </div>
    )
}

export default FormProduct
