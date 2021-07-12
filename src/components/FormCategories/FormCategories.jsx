import React, { useState } from 'react';
import { validate } from './ValidateInput';
import { url } from '../../constantURL';
import axios from 'axios'
import { getAllCategories } from '../../Redux/Actions'
import './FormCategories.css'


import './FormCategories.css';
import { useDispatch } from 'react-redux';

function FormCategories() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState('El nombre de la categoria es requerido');

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

    function classAsign(errors, classname) {
        return errors !== '' ? 'danger' : classname;
    }

    return (
        <div className='categories-form'>
            <form className='form-cont' onSubmit={handleSubmit}>
                <label className='input-name'>Nombre de la categoria a añadir:</label>
                <input className={classAsign(errors, 'Cinput')} type="text" value={name} onChange={handleChange} name='name' placeholder='Nombre de la categoria a añadir'/>
                {
                    errors === '' ?
                    <button className='submit-button' type='submit'>Agregar categoria</button> :
                    <p>{errors}</p>
                }
            </form>
        </div>
    )
}

export default FormCategories;