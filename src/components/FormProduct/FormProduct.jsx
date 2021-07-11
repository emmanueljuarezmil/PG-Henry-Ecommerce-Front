import React, { useState, useMemo } from 'react'
import { BsTrash } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useTable, usePagination } from 'react-table'
import Dropzone, { useDropzone } from 'react-dropzone'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import './FormProduct.css'
import axios from 'axios'
import { url } from '../../constantURL'

function FormProduct() {

    // como admin poder
    // 1) cargar un producto nuevo
    // 1)a) form (name, photos (max 3), descrip, stock, selled, perc_desc, price, category)
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
    // textarea grande para descrip
    // hovers en botones
    // stock en rojo cuando es 0
    // estilos cuando la mayoria de las features ya esten
    // 
    // modularizar funciones


    const categories = useSelector((state) => state.categories);
    function seter(array) {
        let obj = {}
        array.map((cat) => {
            let a = cat.id;
            obj[a] = false;
            return null
        })
        return obj
    }
    
    const [cat, setCat] = useState(seter(categories))
    const handleCheck = (event, id) => {
        event ?
        setCat({ ...cat, [event.target.value]: event.target.checked }) :
        setCat({...cat, [id]: true})
    };

    const [actionType, setActionType] = useState('create')
    const [input, setInput] = useState({
        photo: []
    })

    const allProducts = useSelector(state => state.all_products)


    const actionOptions = [
        { value: 'create', label: 'Crear un nuevo producto' },
        { value: 'read', label: 'Ver los productos existentes' },
        { value: 'update', label: 'Editar un producto' }
    ]

    function handleChange(e) {
        e.preventDefault()
        const { value, name } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    const onDrop = (acceptedFiles) => {
        acceptedFiles.forEach(async (file) => {
            const url = 'https://api.cloudinary.com/v1_1/dn6fn4w40/image/upload'
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "spjvomor");
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const img = data.url
                    setInput({
                        ...input,
                        photo: [...input.photo, img]
                    })
                })
                .catch((err) => console.error(err))
        })
    }

    useDropzone({ onDrop })

    const maxImageSize = 250000

    const deleteProduct = (id) => {
        alert(`Intentas eliminar el producto con el id ${id}`)
    }

    const editProduct = async (id) => {
        try {
            const response = await axios.get(`http://3.15.15.92:3000/products/p/${id}`)
            setActionType('update') 
            setInput(response.data)
            const catTrueObj = {}

            Object.keys(cat).forEach( key => catTrueObj[key] = false )

            response.data.Categories.map(category => category.id).forEach(category => catTrueObj[category] = true)
            setCat({...catTrueObj})
        }
        catch(err){
            console.error(err)
        }
    }

    const deletePhoto = (index) => {
        const photos = input.photo
        photos.splice(index, 1)
        setInput({
            ...input,
            photo: photos
        })
    }

    // eslint-disable-next-line
    const dataTable = allProducts.map(product => {
        return {
            col1: (<BsTrash onClick={() => deleteProduct(product.id)} />),
            col2: (<AiTwotoneEdit onClick={() => editProduct(product.id)} />),
            col3: product.name.length > 50 ? `${product.name.slice(0, 50)} ...` : product.name,
            col4: product.Categories.map(category => category.name).join(', '),
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

    const { pageIndex, pageSize } = state

    const onSubmit = async (e) => {
        e.preventDefault()
        const category = []
        for (let categ in cat) {
            if (cat[categ]) {
                category.push(categ)
            }
        }
        const body = {
            name: input.name,
            price: input.price,
            stock: input.stock,
            photo: input.photo,
            category
        }
        const response = await axios.post(`${url}/products`, body)
    }

    //  Return de React
    return (
        <div>
            <h2>Accion que deseas realizar:</h2>
            <Select options={actionOptions}
                onChange={(e) => setActionType(e.value)}
                value={actionOptions.filter(option => option.value === actionType)}>
            </Select>
            {
                // form para crear producto nuevo
                actionType === 'create' || actionType === 'update' ?
                    <form onSubmit={(e) => onSubmit(e)}>
                        <button type="submit">Enviar</button>
                        <div>
                            <input type="text"
                                name="name"
                                placeholder="Nombre del producto"
                                pattern="^[a-zA-Z ,.-]+$"
                                value={input.name}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <input type="text"
                                name="descrip"
                                pattern="^[a-zA-Z0-9 ,.-]+$"
                                placeholder="Descripcion del producto"
                                value={input.descrip}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <input type="number"
                                min={0}
                                max={500}
                                name="stock"
                                placeholder="Stock actual"
                                value={input.stock}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <input type="number"
                                min={0}
                                max={500}
                                name="selled"
                                placeholder="Cantidades vendidas"
                                value={input.selled}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <input type="number"
                                min={0}
                                max={1000000000}
                                name="price"
                                placeholder="Precio del producto"
                                value={input.price}
                                onChange={handleChange} />
                        </div>
                        <div>
                            <input type="number"
                                min={0}
                                max={100}
                                name="perc_desc"
                                placeholder="Porcentaje de descuento"
                                value={input.perc_desc}
                                onChange={handleChange} />
                        </div>
                        <div>
                            {categories.map(c => {
                                return (
                                    <li>
                                        <input type='checkbox'
                                        value={c.id}
                                        onChange={handleCheck}
                                        {...(cat[c.id] ? {checked: 'checked'} : {checked: false})} />
                                        <label>{c.name}</label>
                                    </li>
                                )
                            })}
                        </div>
                        <div>
                            <div>

                                {
                                    input.photo && input.photo.length < 3 ?
                                        <Dropzone
                                            onDrop={acceptedFiles => onDrop(acceptedFiles)}
                                            maxSize={maxImageSize}
                                            maxFiles={3}
                                            accept='image/*'>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()} className="dropzone">
                                                        <input {...getInputProps()} />
                                                        <p>Arrastra y suelta tus photos aqui o haz click para cargar desde el explorador(máx {maxImageSize / 1000}kb)</p>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone> :
                                        <h2>Puedes cargar hasta un maximo de 3 photos, elimina alguna si quieres cargar una nueva</h2>
                                }
                            </div>
                            <div>
                                {
                                    input.photo && input.photo.length ?
                                        input.photo.map((photo, index) => (
                                            <div key={index}>
                                                <img src={photo}
                                                    alt="Img not found" />
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        deletePhoto(index)
                                                    }
                                                    }>
                                                    Eliminar photo
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
                                    ))
                                }
                            </select>
                        </div>
                    </div>
            }

        </div>
    )
}

export default FormProduct