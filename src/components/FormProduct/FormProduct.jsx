import React, { useState, useMemo } from 'react'
import { BsTrash } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useTable, usePagination } from 'react-table'
import Dropzone, { useDropzone } from 'react-dropzone'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../Redux/Actions'
import {url} from '../../constantURL'
import './FormProduct.css'
import axios from 'axios'

const backendUrl = url
const compressImageUrl = 'https://imagecompressor.com/'

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

    const maxImageSize = 300*1024

    const deleteProduct = async (id) => {
        const name = allProducts.filter(product => product.id === id)[0].name
        const result = window.confirm(`Estás seguro de que deseas eliminar ${name}`)
        if(result) {
            try {
                await axios.delete(`${backendUrl}/products`, {
                    data: {id}
                })
                dispatch(getAllProducts())
                window.alert('Se ha eliminado el producto con exito')
            } catch(err) {
                window.alert('ocurrió un problema y no se pudo eliminar el producto')
                console.error(err)
            }
        }
    }

    const editProduct = async (id) => {
        try {
            const response = await axios.get(`${backendUrl}/products/p/${id}`)
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
                await axios.post(`${backendUrl}/products`, body)
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
                await axios.put(`${backendUrl}/products/update`, body)
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
        <div className='formproduct-container'>
            <h2>Accion que deseas realizar:</h2>
            <Select options={actionOptions}
                onChange={(e) => setActionType(e.value)}
                value={actionOptions.filter(option => option.value === actionType)}>
            </Select>
            <div className='formproduct-form-container'>
                {
                    actionType === 'create' || actionType === 'update' ?
                        <form onSubmit={(e) => onSubmit(e)}>
                            <button type="submit">Enviar</button>
                            <div>
                                <input type="text"
                                    name="name"
                                    placeholder="Nombre del producto"
                                    pattern="^[a-zA-Z0-9 ,.-]+$"
                                    value={input.name}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <input type="text"
                                    name="descrip"
                                    pattern="^[a-zA-Z0-9 ,.-?]+$"
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
                                <div className="formproduct-dropzone-container">

                                    {
                                        input.photo && input.photo.length < 3 ?
                                            <Dropzone
                                                onDrop={acceptedFiles => onDrop(acceptedFiles)}
                                                maxSize={maxImageSize}
                                                maxFiles={3}
                                                accept='image/*'>
                                                {({ getRootProps, getInputProps }) => (
                                                    <section>
                                                        <div {...getRootProps()} className='formproduct-dropzone-dropzone'>
                                                            <input {...getInputProps()} />
                                                            <p>Arrastra y suelta tus photos aqui o haz click para cargar desde el explorador(máx {maxImageSize / 1024}kb)</p>
                                                        </div>
                                                        <a rel="noopener noreferrer" href={compressImageUrl} target="_blank">Tu imagen excede el tamaño permitido? Pulsa aqui para comprimirla</a>
                                                    </section>
                                                )}
                                            </Dropzone> :
                                            <h2>Puedes cargar hasta un maximo de 3 photos, elimina alguna si quieres cargar una nueva</h2>
                                    }
                                </div>
                                <div className='formproduct-images-container'>
                                    {
                                        input.photo && input.photo.length ?
                                            input.photo.map((photo, index) => (
                                                <div key={index}
                                                className='formproduct-images-item-container'>
                                                    <img src={photo}
                                                        alt="Img not found"
                                                        className='formproduct-images-item-image'/>
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
                        null
                }
            </div>
            <div className='formproduct-table-container'>
                {
                    actionType === 'read' ?
                        <div className='formproduct-table-table'>
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
                            <div className='formproduct-table-pagination-container'>
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
                        </div> :
                        null
                }
            </div>
        </div>
    )
}

export default FormProduct