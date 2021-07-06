import React,{useState} from 'react'
import './FormCategories.css'

function FormCategories() {
    const [name,setName]=useState('');
    const [errors,setErrors]=useState('');

    const handleChange=(e)=>{
        e.preventDefault();
        setName(e.target.value)
        setErrors(validate(name))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(name===''){
            setErrors('Name is required!!')
        }
        else if(name.length<3){
            setErrors('Name must have at least three length characters')
        }
        else if(!errors){
            //aqui pondriamos el post
        }
    }

    return (
        <div>
            <form  className='form-cont' onSubmit={handleSubmit}>
                <label className='input-name'>New category name: </label>
                <input className={classAsign(errors,'Cinput')} type="text" value={name} onChange={handleChange} name='name' placeholder=' to add' />
                <p className='danger'>{errors}</p>
                <button className='submit-button' type='submit'>Add</button>
            </form>
        </div>
    )
}
function classAsign(errors,classname){
    return errors? 'danger':classname;
}
export default FormCategories
export function validate(input) {
    let errors = '';
    if (input.length<2) {
      errors = 'Name must have at least three length characters';
    }
    return errors
}