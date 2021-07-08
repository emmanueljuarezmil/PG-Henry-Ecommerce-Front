import React, {useState, useMemo} from 'react'
import {BsTrash} from 'react-icons/bs'
import {AiTwotoneEdit} from 'react-icons/ai'
import {useTable, usePagination} from 'react-table'
import Dropzone, {useDropzone} from 'react-dropzone'
import Select from 'react-select'
import './FormProduct.css'

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
    
    // FEATURES/FALTANTES:
    // conectar con back
    // 
    // validar input + requireds
    // 
    // post new product funcional
    // 
    // put producto existente funcional
    // boton agregar cambios en form
    // 
    // delete producto existente en detalle
    // boton eliminar producto en form
    // 
    // multi select para marcar varios productos para eliminar de una
    // multi delete productos existentes funcional
    // boton eliminar todos  
    //  
    // pasar de useState al store de redux
    // filtros de tabla: precio mayor que menor que ingresado por admin, categoria,
    // ordenamientos: precio, categorias, stock
    // 
    // estilos
    // textarea grande para description
    // hovers en botones
    // stock en rojo cuando es 0
    // estilos cuando la mayoria de las features ya esten
    // 
    // modularizar funciones
    
    
    // function onSumbit(e) {
    //     e.preventDefault()
    // }
        
        
    const productsHardcoded = require('./DBproductsform.json')
    const [actionType, setActionType] = useState('create')
    const [input, setInput] = useState({
        foto: []
    })
    // const [addedPhotos, setAddedPhotos] = useState([])
    const actionOptions = [
        { value: 'create', label: 'Crear un nuevo producto' },
        { value: 'readAndModified', label: 'Ver los productos existentes, editarlos o eliminarlos' }
    ]
    
    function handleChange(e) {
        e.preventDefault()
        const { value, name } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }
    
    const arrayBufferPhotoToBlob = (photo) => {
        var blob = new Blob([photo])
        var imageUrl = URL.createObjectURL( blob )
        return imageUrl
    }
    
    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            console.log(`Se esta ejecutando el callback de onDrop`)
            const reader = new FileReader()    
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
            // Do whatever you want with the file contents
                const binaryStr = reader.result
                setInput({
                    ...input,
                    foto: [...input.foto, binaryStr]
                })
            }
            reader.readAsArrayBuffer(file)
        })
    }
    useDropzone({onDrop})
    
    const maxImageSize = 250000

    const deleteProduct = (id) => {
        alert(`Intentas eliminar el producto con el id ${id}`)
    }
    
    const editProduct = (id) => {
        const product = productsHardcoded.find(product => product.id === id)
        setInput(product)
        setActionType('create')
    }

    const deletePhoto = (index) => {
        const photos = input.foto
        photos.splice(index,1)
        setInput({
            ...input,
            foto: photos
        })
    }

    // cambia el estado pero no actualiza
    // const deletePhotoCharged = (index) => {
    //     console.log(`se intenta borrar el elemento ${index}`)
    //     const photos = addedPhotos
    //     photos.splice(index,1)
    //     console.log(photos)
    //     setAddedPhotos(photos)
    // }


    // tabla con todos los productos
    
    // eslint-disable-next-line
    const dataTable = productsHardcoded.map(product => {
        return {
            col1: (<BsTrash onClick={() => deleteProduct(product.id)}/>),
            col2: (<AiTwotoneEdit onClick={() => editProduct(product.id)}/>),
            col3: product.name.length > 50 ? `${product.name.slice(0, 50)} ...` : product.name,
            col4: product.category.join(', '),
            col5: `$ ${product.price}`,
            col6: product.stock,
        }
    })
    
    const columnsTable = [
            {
                Header: 'Eliminar',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Editar',
                accessor: 'col2', // accessor is the "key" in the data
            },
            {
                Header: 'Nombre',
                accessor: 'col3', // accessor is the "key" in the data
            },
            {
                Header: 'Categorias',
                accessor: 'col4',
            },
            {
                Header: 'Precio',
                accessor: 'col5',
            },
            {
                Header: 'Stock',
                accessor: 'col6',
            },
        ]
    
    // eslint-disable-next-line
    const columns = useMemo(() => columnsTable, [])
    // eslint-disable-next-line
    const data = useMemo(() => dataTable, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
    } = useTable({
            columns,
            data,
            initialState: {
                pageSize: 20
            }
        },
          usePagination
        )
    
    const {pageIndex, pageSize} = state
    
    //  Return de React
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
                        min={0}
                        name="stock" 
                        placeholder="Stock actual"
                        value={input.stock}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="number"
                        min={0}
                        name="selled"
                        placeholder="Cantidades vendidas"
                        value={input.selled}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="number"
                        min={0}
                        name="price"
                        placeholder="Precio del producto"
                        value={input.price}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="number"
                        min={0}
                        max={100}
                        name="perc_desc"
                        placeholder="Porcentaje de descuento"
                        value={input.perc_desc}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        {
                            input.foto.length < 3 ?
                                <Dropzone 
                                onDrop={acceptedFiles => onDrop(acceptedFiles)}
                                maxSize={maxImageSize}
                                maxFiles={3}
                                accept='image/*'
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                        <div {...getRootProps()} className="dropzone">
                                            <input {...getInputProps()} />
                                            <p>Arrastra y suelta tus fotos aqui o haz click para cargar desde el explorador(máx {maxImageSize/1000}kb)</p>
                                        </div>
                                        </section>
                                    )}
                                </Dropzone> :
                                <h2>Puedes cargar hasta un maximo de 3 fotos, elimina alguna si quieres cargar una nueva</h2>
                        }
                        <div>
                            {
                                input.foto && input.foto.length ?
                                input.foto.map((foto, index) => (
                                    <div key={index}>
                                        <img src={
                                            typeof foto === 'string' ?
                                            foto :
                                            arrayBufferPhotoToBlob(foto)
                                        } 
                                        alt="Img not found" 
                                        
                                        />
                                        <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            deletePhoto(index)
                                        }
                                        }>
                                            Eliminar foto
                                        </button>
                                    </div>
                                )) :
                                null
                            }
                        </div>
                    </div>
                </form> :
                <div>

                    <table {...getTableProps()}>
                        <thead>
                        {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                            headerGroup.headers.map(column => (
                                // Apply the header cell props
                                <th {...column.getHeaderProps()}>
                                {// Render the header
                                column.render('Header')}
                                </th>
                            ))}
                            </tr>
                        ))}
                        </thead>
                        {/* Apply the table body props */}
                        <tbody {...getTableBodyProps()}>
                        {// Loop over the table rows
                        page.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                row.cells.map(cell => {
                                // Apply the cell props
                                return (
                                    <td {...cell.getCellProps()}>
                                    {// Render the cell contents
                                    cell.render('Cell')}
                                    </td>
                                )
                                })}
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    <div>
                        <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}>
                            {'<<'}
                        </button>
                        <button 
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}>
                            Anterior
                        </button>
                        <span>
                            Página
                            <strong>
                                {` ${pageIndex + 1} `}
                            </strong>
                            {`de ${pageOptions.length}`}
                        </span>
                        <button 
                        onClick={() => nextPage()}
                        disabled={!canNextPage}>
                            Siguiente
                        </button>
                        <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}>
                            {'>>'}
                        </button>
                        <select value={pageSize} 
                        onChange={e => setPageSize(Number(e.target.value))}>
                            {
                                [10, 50, 100, dataTable.length].map((pageSize, i) => (
                                    i !== 3 ? 
                                    <option key={pageSize}
                                    value={pageSize}>
                                    Ver de a {pageSize} items
                                    </option> :
                                    <option key={dataTable.length}
                                    value={dataTable.length}>
                                    Ver todo
                                    </option>
                                ) )
                            }
                        </select>
                    </div>
                </div>
            }
            
        </div>
    )
}



export default FormProduct
