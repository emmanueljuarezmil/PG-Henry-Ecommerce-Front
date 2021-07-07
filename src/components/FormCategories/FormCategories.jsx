import React, { useState } from 'react';
import validate from './ValidateInput';

import './FormCategories.css';

function FormCategories() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
        setErrors(validate(name))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.keys(errors).length === 0) {
            //aqui pondriamos el post
            setName({});
            alert('Category created');
        }
        else alert('You must type a correct category name');
    }

    return (
        <div>
            <form className='form-cont' onSubmit={handleSubmit}>
                <label className='input-name'>New category name: </label>
                <input className={classAsign(errors, 'Cinput')} type="text" value={name} onChange={handleChange} name='name' placeholder=' to add' />
                <p className='danger'>{errors}</p>
                <button className='submit-button' type='submit'>Add</button>
            </form>
        </div>
    )
}
function classAsign(errors, classname) {
    return errors ? 'danger' : classname;
}
export default FormCategories;