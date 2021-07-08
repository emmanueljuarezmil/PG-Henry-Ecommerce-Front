import React, {useState, useCallback} from 'react'
import {BsTrash} from 'react-icons/bs'
import {AiTwotoneEdit} from 'react-icons/ai'
import {useTable} from 'react-table'
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
    // stock en rojo cuando es 0
    // paginar tabla
    // filtros de tabla
    // textarea grande para description
    // boton eliminar en form    
    // boton agregar cambios en form
    // combinar dropzone con fotos ya existentes, limitar a 3 (urls + arraybuffer)
    // 
    // 
    // 

        
            
    // function onSumbit(e) {
    //     e.preventDefault()
    // }
    
    
    const productsHardcoded = require('./DBproductsform.json')
    
    const [actionType, setActionType] = useState('create')
    const [input, setInput] = useState({})
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


    // const toBase64 = file => new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result);
    //     reader.onerror = error => reject(error)
    // })
    
    
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
          const reader = new FileReader()
    
          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
          // Do whatever you want with the file contents
            const binaryStr = reader.result
            console.log(binaryStr)
          }
          reader.readAsArrayBuffer(file)
        })
        
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    // getRootProps
    // getInputProps
    // isDragActive
    const maxImageSize = 250000
    // // Encode to base64
    // var encodedImage = new Buffer(data, 'binary').toString('base64');

    // // Decode from base64
    // var decodedImage = new Buffer(encodedImage, 'base64').toString('binary');

    const deleteProduct = (id) => {
        alert(`Intentas eliminar el producto con el id ${id}`)
    }
    
    const editProduct = (id) => {
        const product = productsHardcoded.find(product => product.id === id)
        setInput(product)
        setActionType('create')
    }

    const deleteFoto = (deletedFoto) => {
        setInput({
            ...input,
            foto: input.foto.filter(foto => foto !== deletedFoto)
        })
    }

    const data = React.useMemo(() => 
        productsHardcoded.map(product => {
            return {
                col1: product.name.length > 50 ? `${product.name.slice(0, 50)} ...` : product.name,
                col2: product.category.join(', '),
                col3: `$ ${product.price}`,
                col4: product.stock,
                col5: (<BsTrash onClick={() => deleteProduct(product.id)}/>),
                col6: (<AiTwotoneEdit onClick={() => editProduct(product.id)}/>)
            }
        }))
    const columns = React.useMemo(
        () => [
            {
                Header: 'Eliminar',
                accessor: 'col5', // accessor is the "key" in the data
            },
            {
                Header: 'Editar',
                accessor: 'col6', // accessor is the "key" in the data
            },
            {
                Header: 'Nombre',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Categorias',
                accessor: 'col2',
            },
            {
                Header: 'Precio',
                accessor: 'col3',
            },
            {
                Header: 'Stock',
                accessor: 'col4',
            },
        ],
        []
      )

    const tableInstance = useTable({ columns, data })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance
    
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
                        <Dropzone 
                        onDrop={acceptedFiles => onDrop(acceptedFiles)}
                        maxSize={maxImageSize}
                        accept='image/*'
                        >
                            {({getRootProps, getInputProps}) => (
                                <section>
                                <div {...getRootProps()} className="dropzone">
                                    <input {...getInputProps()} />
                                    <p>Arrastra y suelta tus fotos aqui o haz click para cargar desde el explorador</p>
                                </div>
                                </section>
                            )}
                        </Dropzone>
                        <div>
                            <p>Fotos</p>
                            {
                                input.foto && input.foto.length ?
                                input.foto.map(foto => (
                                    <div>
                                        <img src={foto} 
                                        alt="Img not found" onClick={() => deleteFoto(foto)}/>
                                    </div>
                                )) :
                                null
                            }
                        </div>
                    </div>
                </form> :
                // barra de busqueda y lista de productos existentes
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
       rows.map(row => {
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
            }
            
        </div>
    )
}

export default FormProduct
