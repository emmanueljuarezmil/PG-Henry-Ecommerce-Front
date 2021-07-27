import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormShipping from './FormShipping';
import Cookies from 'js-cookie';
import { updateShippingAddress } from '../../Redux/Actions';

const InfoShipping = () => {
    const dispatch = useDispatch();
    const userId = Cookies.get('id');
    const data = useSelector(state => state.user_address);
    
    const onClick = () => {
        dispatch(updateShippingAddress(userId, ['', '', '']))
    }
    
    return (
        <div>
            { data[0].length > 1 && data[1].length > 1 && data[2].length > 1 ? <div>
            <p className="label_shipping_form">Direccion de envio: {data[0]}</p>
            <p className="label_shipping_form">Ciudad: {data[1]}</p>
            <p className="label_shipping_form">Codigo postal: {data[2]}</p>
            <form>
            <button className="submit_shipping_button" type="submit" onClick={onClick} >Editar</button>
            </form>
            </div>
            : <FormShipping/>
        }
        </div>
    )
};

export default InfoShipping;