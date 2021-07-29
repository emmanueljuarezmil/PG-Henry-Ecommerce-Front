import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateShippingAddress } from '../../Redux/Actions';
import Cookies from 'js-cookie';
import './FormShipping.css'
import Swal from 'sweetalert2';

const FormShipping = () => {
    const dispatch = useDispatch();
    const userId = Cookies.get('id');

    const [input, setInput] = useState({
        direccion: '',
        ciudad: '',
        codigo: ''
    })

    // eslint-disable-next-line
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        //e.preventDefault()
        let shippingAddress = [];
        shippingAddress.push(input.direccion, input.ciudad, input.codigo)
        dispatch(updateShippingAddress(userId, shippingAddress))
        Swal.fire({
            icon: 'success',
            text: 'Dirección actualizada',
            showConfirmButton: false,
            timer: 2000
          })
    }

    return (
        <div>
            <form className="shipping_form"
                onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className="label_shipping_form">Direccion de envio:</label>
                    <input
                        onChange={handleInputChange}
                        className={`${errors.direccion && "danger"}`}
                        type="text"
                        name="direccion"
                        value={input.direccion}
                    />
                </div>
                <div>
                    <label className="label_shipping_form">Ciudad:</label>
                    <input
                        onChange={handleInputChange}
                        className={`${errors.ciudad && "danger"}`}
                        type="text"
                        name="ciudad"
                        value={input.ciudad}
                    />
                </div>
                <div>
                    <label className="label_shipping_form">Codigo postal:</label>
                    <input
                        onChange={handleInputChange}
                        className={`${errors.codigo && "danger"}`}
                        type="text"
                        name="codigo"
                        value={input.codigo}
                    />
                </div>
                <button className="submit_shipping_button" type="submit">
                    Aceptar
                </button>
            </form>
        </div>
    )
};

export default FormShipping;