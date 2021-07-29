import React, { useState } from 'react';
import { validate } from './ValidateInput';
import { url } from '../../constantURL';
import axios from 'axios'
import { getAllCategories} from '../../Redux/Actions'
import './FormCategories.css'
import { useDispatch,useSelector} from 'react-redux';
import { headers } from '../../controllers/GetHeaders'
import Swal from 'sweetalert2';

function FormCategories() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState('El nombre de la categoria es requerido');
    const [newName,setNewName]=useState({})

    const cats= useSelector((state)=>state.categories);

    const dispatch = useDispatch()

    const handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
        setErrors(validate(e.target.value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (errors === '') {
            try {
                const body = {name}
                await axios.post(`${url}/category`,
                    body,
                    {headers}
                )
                dispatch(getAllCategories())
                setName('');
                Swal.fire({
                    icon: 'success',
                    text: 'Categoria creada',
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
            catch(err) {
                console.error(err)
                Swal.fire({
                    icon: 'error',
                    text: 'Ocurrió un problema y no se pudo crear la categoria',
                    showConfirmButton: false,
                    timer: 2000
                  })
            }
        }
        else Swal.fire({
            icon: 'error',
            text: 'Debes especificar un nombre para la categoria',
            showConfirmButton: false,
            timer: 2000
          })
    }

    const handleDelete = async (id)=>{
        try{
            const body={id};
            await axios.delete(`${url}/category/${body.id}`,{data:body, headers});
            dispatch(getAllCategories())
            Swal.fire({
                icon: 'success',
                text: 'Categoria eliminada con éxito',
                showConfirmButton: false,
                timer: 2000
              })
        }catch(err){
            console.error(err)
            Swal.fire({
                icon: 'error',
                text: 'Ocurrió un problema y no se pudo eliminar la categoria',
                showConfirmButton: false,
                timer: 2000
            })
        }
    }
    const handleChangeMod= (e)=>{
        e.preventDefault();
        setNewName({
            ...newName,
            [e.target.name]:e.target.value
        })
    }
    const handleUpdate = async (e,id,name)=>{
        e.preventDefault();
        try{
            // const ids=Object.keys(newName);
            // const names=Object.values(newName);
            let body={id:id,name:name}
            await axios.put(`${url}/category/update`,body, {headers});
            setNewName({...newName,[id]:''});
            dispatch(getAllCategories())
            Swal.fire({
                icon: 'success',
                text: 'Categoria modificada con éxito',
                showConfirmButton: false,
                timer: 2000
              })
        }catch(err){
            console.error(err)
            Swal.fire({
                icon: 'error',
                text: 'Ocurrió un problema y no se pudo modificar la categoria',
                showConfirmButton: false,
                timer: 2000
              })
        }
    }


    function classAsign(errors, className) {
        return errors !== '' ? 'danger' : className;
    }

    return (
        <div className='categories-form-container'>
            <div className='categories-form'>
                <form className='form-cont' onSubmit={handleSubmit}>
                    <label className='input-name'>Nombre de la categoria a añadir:</label>
                    <input className={classAsign(errors, 'Cinput')} type="text" value={name}
                     onChange={handleChange} name='name' placeholder='Nombre de la categoria a añadir'/>
                    {
                        errors === '' ?
                        <button className='submit-button' type='submit'>Agregar categoria</button> :
                        <p>{errors}</p>
                    }
                </form>
            </div>
            <div className='categories-table'>
                <ul className='categories-list'>
                    {cats.map((c, index)=>{
                        const {name,id}=c;
                        let placeHolder='Nuevo nombre.'
                        return(
                            <li className='table' key={index}>
                            <p className='name'>{name}</p>
                            <button onClick={()=>handleDelete(id)}>Borrar</button>
                            <div className='form-div'>
                                <form className="searchform" onSubmit={(e)=>handleUpdate(e,c.id,newName[id])} >
                                    <label for={c.id} className='special-label'>
                                        <i className="icon-edit"></i>
                                    </label>
                                    <input type="text" value={newName[id]} name={id} placeholder={placeHolder}
                                    className="s" id={c.id} onChange={(e)=>handleChangeMod(e)} ></input>
                                    <button type="submit">Editar</button>
                                </form>
                            </div>
                            
                            </li>
                        )                        
                    })}
                </ul>
            </div>
        </div>
        

    )
}

export default FormCategories;