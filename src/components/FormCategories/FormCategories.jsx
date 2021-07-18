import React, { useState } from 'react';
import { validate } from './ValidateInput';
import { url } from '../../constantURL';
import axios from 'axios'
import { getAllCategories} from '../../Redux/Actions'
import './FormCategories.css'


import './FormCategories.css';
import { useDispatch,useSelector} from 'react-redux';





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
                await axios.post(`${url}/category`, body)
                dispatch(getAllCategories())
                setName('');
                alert('Categoria creada');
            }
            catch(err) {
                console.error(err)
                alert('Ocurrió un problema y no se pudo crear la categoria')
            }
        }
        else alert('Debes especificar un nombre que no exista para la categoria');
    }

    const handleDelete = async (id)=>{
        try{
            const body={id};
            await axios.delete(`${url}/category/${body.id}`,{data:body});
            dispatch(getAllCategories())
            alert('Categoria eliminada con éxito.')
        }catch(err){
        console.error(err)
         alert('Ocurrió un problema y no se pudo eliminar la categoria.')}
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
            await axios.put(`${url}/category/update`,body);
            setNewName({...newName,[id]:''});
            dispatch(getAllCategories())
            alert('Categoria modificada con éxito.')
        }catch(err){
            console.error(err)
            alert('Ocurrio un problema y no se pudo modificar la categoria.')
        }
    }


    function classAsign(errors, className) {
        return errors !== '' ? 'danger' : className;
    }

    return (
        <div>
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
                    {cats.map(c=>{
                        const {name,id}=c;
                        let placeHolder='Nuevo nombre.'
                        return(
                            <li className='table'>
                            <p className='name'>{name}</p>
                            <button onClick={()=>handleDelete(id)}>delete</button>
                            <div className='form-div'>
                                <form  className="searchform" onSubmit={(e)=>handleUpdate(e,c.id,newName[id])} >
                                    <label for={c.id} className='special-label'>
                                        <i class="icon-edit"></i>
                                    </label>
                                    <input type="text" value={newName[id]} name={id} placeholder={placeHolder}
                                    className="s" id={c.id} onChange={(e)=>handleChangeMod(e)} ></input>
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