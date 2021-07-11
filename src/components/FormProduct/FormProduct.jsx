import React, { useState, useMemo } from 'react'
import { BsTrash } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useTable, usePagination } from 'react-table'
import Dropzone, { useDropzone } from 'react-dropzone'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../Redux/Actions'
import './FormProduct.css'
import axios from 'axios'
// import { url } from '../../constantURL' no funca dentro de un async, toma la url local

function FormProduct() {

    const categories = useSelector((state) => state.categories);
    const allProducts = useSelector(state => state.all_products)
    
    const seter = (array) => {
        let obj = {}
        array.map((cat) => {
            let a = cat.id;
            obj[a] = false;
            return null
        })
        return obj
    }

    const [cat, setCat] = useState(seter(categories))
    const [actionType, setActionType] = useState('create')
    const [input, setInput] = useState({
        photo: []
    })
    
    const dispatch = useDispatch()

    
    const handleCheck = (event, id) => {
        event ?
        setCat({ ...cat, [event.target.value]: event.target.checked }) :
        setCat({...cat, [id]: true})
    };

    const actionOptions = [
        { value: 'create', label: 'Crear un nuevo producto' },
        { value: 'read', label: 'Ver los productos existentes' },
        { value: 'update', label: 'Editar un producto' }
    ]

    const handleChange = (e) => {
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

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products`, {
                data: {id}
            })
            dispatch(getAllProducts())
            window.alert('Se ha eliminado el producto con exito')
        } catch(err) {
            window.alert('ocurrió un problema y no se pudo eliminar el producto')
            console.error(err)
        }
    }

    const editProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/products/p/${id}`)
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
    const data = useMemo(() => dataTable, [allProducts])

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
        if(actionType === 'create') {
            try {
                const response = await axios.post(`http://localhost:3000/products`, body)
                console.log(response)
                window.alert('Se ha creado el producto con exito')
            }
            catch(err) {
                console.error(err)
                window.alert('Ocurrió un problema y no se pudo crear el producto')
            }
        }
        if(actionType === 'update') {
            try {
                body.id = input.id
                const response = await axios.put(`http://localhost:3000/products/update`, body)
                console.log(response)
                window.alert('Se ha actualizado el producto con exito')
            }
            catch(err) {
                console.error(err)
                window.alert('Ocurrió un problema y no se pudo actualizar el producto')
            }
        }
        dispatch(getAllProducts())        
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