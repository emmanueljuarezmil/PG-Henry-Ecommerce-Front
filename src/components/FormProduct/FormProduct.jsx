import React, { useState, useMemo, useEffect } from 'react'
import { BsTrash } from 'react-icons/bs'
import { AiTwotoneEdit } from 'react-icons/ai'
import { useTable, usePagination } from 'react-table'
import Dropzone, { useDropzone } from 'react-dropzone'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../../Redux/Actions/index'
import {url} from '../../constantURL'
import './FormProduct.css'
import axios from 'axios'
import { headers } from '../../controllers/GetHeaders'
import Swal from 'sweetalert2';

const backendUrl = url
const compressImageUrl = 'https://imagecompressor.com/'
const cloudImageUrl = 'https://api.cloudinary.com/v1_1/dn6fn4w40/image/upload'

function FormProduct() {
    
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories);
    const allProducts = useSelector(state => state.all_products)
    const totalPages = useSelector(state => state.totalPages)
    
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
        photo: [],
        name: '',
        price: '',
        stock: '',
        category: []
    })
    const [errors, setErrors] = useState(' ')
    const [pageIndex, setPageIndex] = useState(1)
      
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
    
    // ver de mejorarlo o cambiar la logica de los checkbox
    useEffect(() => {
        const category = []
        Object.keys(cat).forEach( key => cat[key] ? category.push(key) : null )
        setInput({
            ...input,
            category
        })
        // eslint-disable-next-line
    }, [cat])
    
    useEffect(() => {
        const {name, price, stock, category} = input
        let errors = ''
    
        if (category.length > 2) errors = 'Solo se pueden especificar 2 categorias como máximo'
        if (!category.length) errors = 'Debes especificar al menos una categoria para tu producto'        
        if (stock < 1) errors = 'El stock debe ser un entero positivo'
        if (!stock) errors = 'Se debe especificar el stock del producto'    
        if (price < 1) errors = 'El precio debe ser un entero positivo'
        if (!price) errors = 'Se debe especificar un precio para el producto'    
        if (!/^[a-zA-Z0-9 ,.-ñÑ]+$/.test(name)) errors = 'El nombre del producto no puede contener caracteres especiales'
        if (name.length < 5) errors = 'El nombre del producto debe tener al menos 5 caracteres'
        if (name.length === 0) errors = 'El nombre del producto es requerido'    
        setErrors(errors)      
    }, [input])

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
            const url = cloudImageUrl
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
        Swal.fire({
            text: `Estás seguro de que deseas eliminar "${name}" ?`,
            icon: 'warning',
            showCancelButton: true,
            // confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: "No"
            }).then(async (result) => {
              if(result.isConfirmed) {
                  try {
                      await axios.delete(`${backendUrl}/products`,
                      { data: {id}, headers},
                       )
                      dispatch(getAllProducts())
                      Swal.fire({
                          icon: 'success',
                          text: 'Se ha eliminado el producto con éxito',
                          showConfirmButton: false,
                          timer: 2000
                        })
                  } catch(err) {
                      Swal.fire({
                          icon: 'error',
                          text: 'Ocurrió un problema y no se pudo eliminar el producto',
                          showConfirmButton: false,
                          timer: 2000
                        })
                      console.error(err)
                  }
              }
          })
    }

    const editProduct = async (id) => {
        try {
            const { data } = await axios.get(`${backendUrl}/products/p/${id}`, { headers })
            setActionType('update') 
            data.category = data.Categories.map(category => category.id)
            setInput(data)
            const catTrueObj = {}
            Object.keys(cat).forEach( key => catTrueObj[key] = false )
            data.category.forEach(category => catTrueObj[category] = true)
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
            col1: (<BsTrash
                className='trash'
                onClick={() => deleteProduct(product.id)} />),
            col2: (<AiTwotoneEdit
                className='edit'
                onClick={() => editProduct(product.id)} />),
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
        prepareRow,
    } = useTable({
        columns,
        data,
        initialState: {
            pageSize: 40
        }
    },
        usePagination
    )

    const gotoPage = (e, page) => {
        e.preventDefault()
        dispatch(getAllProducts(null, page))
        setPageIndex(page)
    }

    const nextPage = (e) => {
        e.preventDefault()
        dispatch(getAllProducts(null, pageIndex + 1))
        setPageIndex(pageIndex + 1)
    }

    const previousPage = (e) => {
        e.preventDefault()
        dispatch(getAllProducts(null, pageIndex - 1))
        setPageIndex(pageIndex - 1)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const body = {
            ...input
        }
        if(actionType === 'create') {
            try {
                await axios.post(`${backendUrl}/products`, body, { headers })
                Swal.fire({
                    icon: 'success',
                    text: 'Producto creado con éxito',
                    showConfirmButton: false,
                    timer: 2000
                  })
                setInput({
                    photo: [],
                    name: '',
                    stock: '',
                    selled: '',
                    price: '',
                    perc_desc: '',
                    description: '',
                    category: []
                })
                setCat(seter(categories))
            }
            catch(err) {
                console.error(err)
                Swal.fire({
                    icon: 'error',
                    text: 'Ocurrió un problema y no se pudo crear el producto',
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
        }
        if(actionType === 'update') {
            Swal.fire({
                text: `Estás seguro de que deseas actualizar el producto con los cambios propuestos?`,
                icon: 'warning',
                showCancelButton: true,
                // confirmButtonColor: '#3085d6',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: "No"
                }).then(async (result) => {
                  if(result.isConfirmed) {
                    try {
                        body.id = input.id
                        await axios.put(`${backendUrl}/products/update`, body, { headers })
                        Swal.fire({
                            icon: 'success',
                            text: 'Producto actualizado con éxito',
                            showConfirmButton: false,
                            timer: 2000
                          })
                    }
                    catch(err) {
                        console.error(err)
                        Swal.fire({
                            icon: 'error',
                            text: 'Ocurrió un problema y no se pudo actualizar el producto',
                            showConfirmButton: false,
                            timer: 2000
                          })
                    }
                  }
              })
        }
        dispatch(getAllProducts())        
    }

    //  Return de React
    return (
        <div className='formproduct-container'>
            <h2>Accion que deseas realizar:</h2>
            <Select options={actionOptions}
                onChange={(e) => setActionType(e.value)}
                value={actionOptions.filter(option => option.value === actionType)} className='form_select'>
            </Select>
            <div className='formproduct-form-container'>
                {
                    actionType === 'create' || actionType === 'update' ?
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className='formproduct-form-input'>
                                <span>Nombre </span>
                                <input type="text"
                                    name="name"
                                    placeholder="Nombre del producto"
                                    value={input.name}
                                    onChange={handleChange} />
                            </div>
                            <div className='formproduct-form-input'>
                                <span>Stock </span>
                                <input type="number"
                                    min={0}
                                    max={500}
                                    name="stock"
                                    placeholder="Stock actual"
                                    value={input.stock}
                                    onChange={handleChange} />
                            </div>
                            <div className='formproduct-form-input'>
                                <span>Cantidades vendidas </span>
                                <input type="number"
                                    min={0}
                                    max={500}
                                    name="selled"
                                    placeholder="Cantidades vendidas"
                                    value={input.selled}
                                    onChange={handleChange} />
                            </div>
                            <div className='formproduct-form-input'>
                                <span>Precio: </span>
                                <input type="number"
                                    min={0}
                                    max={1000000000}
                                    name="price"
                                    placeholder="Precio del producto"
                                    value={input.price}
                                    onChange={handleChange} />
                            </div>
                            <div className='formproduct-form-input'>
                                <span>Porcentaje de descuento: </span>
                                <input type="number"
                                    min={0}
                                    max={100}
                                    name="perc_desc"
                                    placeholder="Porcentaje de descuento"
                                    value={input.perc_desc}
                                    onChange={handleChange} />
                            </div>
                            <div className='formproduct-form-text-area'>
                                <span>Descripcion: </span>
                                <textarea type="text"
                                    name="description"
                                    pattern="^[a-zA-Z0-9 ,.-?]+$"
                                    placeholder="Descripcion del producto"
                                    value={input.description}
                                    onChange={handleChange} />
                            </div>
                            <div className='container-checkbox'>
                                {categories.map((c, index) => {
                                    return (
                                        <li className='checkbox-li' key={index}>
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
                                                    <section className='formproduct-dropzone-section'>
                                                        <div {...getRootProps()} className='formproduct-dropzone-dropzone'>
                                                            <input {...getInputProps()} />
                                                            <p className='formproduct-dropzone-dropzone-p'>Arrastra y suelta tus photos aqui o haz click para cargar desde el explorador(máx {maxImageSize / 1024}kb)</p>
                                                        </div>
                                                        <a className='formproduct-dropzone-dropzone-a' rel="noopener noreferrer" href={compressImageUrl} target="_blank">Tu imagen excede el tamaño permitido? Pulsa aqui para comprimirla</a>
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
                            <div>
                                {
                                    errors !== '' && errors !== ' ' ?
                                    <p>{errors}</p> :
                                    <button type="submit" className='form_button'>Solicitar</button>
                                }
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
                                    onClick={(e) => gotoPage(e, 1)}
                                    disabled={pageIndex === 1 ? true : false}>
                                    {'<<'}
                                </button>
                                <button
                                    onClick={(e) => previousPage(e)}
                                    disabled={pageIndex === 1 ? true : false}>
                                    Anterior
                                </button>
                                <span>
                                    Página
                                    <strong>
                                        {` ${pageIndex} `}
                                    </strong>
                                    {`de ${totalPages}`}
                                </span>
                                <button
                                    onClick={(e) => nextPage(e)}
                                    disabled={pageIndex === totalPages ? true : false}>
                                    Siguiente
                                </button>
                                <button
                                    onClick={(e) => gotoPage(e, totalPages)}
                                    disabled={pageIndex === totalPages ? true : false}>
                                    {'>>'}
                                </button>
                            </div>
                        </div> :
                        null
                }
            </div>
        </div>
    )
}

export default FormProduct