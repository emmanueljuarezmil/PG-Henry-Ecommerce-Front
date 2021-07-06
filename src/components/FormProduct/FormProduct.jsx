import React, {useState, useRef} from 'react'
import Select from 'react-select'

function FormProduct() {
    // create, read, delete, update
    // si cargo necesito todos los valores del nuevo producto
    // si leo necesito hacer un get de todo lo del producto
    // si borro necesito marcar el producto
    // si updateo necesito los datos nuevos o cambiados

    // cuestiones:

    // si quiero crear un producto nuevo no es tanto viaje, lleno el form nomas y chau

    // ahora, si quiero ver los productos para ver que borro edito o etc son 900, tengo que tener alguna forma practica de ver los productos con algunos datos no todos
    // una vez que veo cual es el que quiero ver full, lo selecciono y ahi se cargan todos los datos de ese producto en el mismo form
    // y ahi puedo decidir si editar algo de ese producto y updatear, o eliminarlo

    const [actionType, setActionType] = useState(null)
    const actionOptions = [
        { value: 'create', label: 'Crear un nuevo producto' },
        { value: 'readAllProducts', label: 'Ver los productos existentes, editarlos o eliminarlos' }
    ]
    const allProducts = [
        { value: 'id producto 1', label: 'nombre producto 1' },
        { value: 'id producto 2', label: 'nombre producto 2' }
    ] //aca iria un map de una ruta nueva del back que traiga solamente nombre y id de los productos o algun dato mas pero que no sea full para que no sea tan pesado
    // una vez que seleccionas un producto, se pide todo el detalle al back y se carga en el input del formulario para ver si queres borrarlo, editarlo o no hacer nada
    
    const actionOptionsRef = useRef(null)
    
    return (
        <div>
            <h2>Accion que deseas realizar:</h2>
            <Select options={actionOptions}
            onChange={(e) => setActionType(e.value)}>
            </Select>
            {
                actionType !== 'create' ?
                <Select options={allProducts}></Select> :
                null
            }
            <form action="">
                <div>
                    <label htmlFor=""></label>
                    <input type="text" name="" id="" /> 
                </div>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" name="" id="" /> 
                </div>
            </form>
            
        </div>
    )
}

export default FormProduct
