import React from "react";
import axios from 'axios';
import { url } from '../constantURL'
import { headers } from "../../controllers/GetHeaders";
import { MdStar } from "react-icons/md";
import './AddToFavs.css'
import swal from 'sweetalert';

export function AddToFavs(props) {
    // eslint-disable-next-line
    async function handleChange() {
        try {
            await axios.post(`${url}/users/favs`, { idProduct: props.product.id }, { headers })
            swal({
                icon: "success",
                title: "Se agregó a favoritos!",
                text: "  ",
                button: null,
                timer: 2000
            })
        } catch (err) {
            console.error(err)
            swal({
                icon: "error",
                title: "Ocurrió algún problema",
                text: "  ",
                button: null,
                timer: 2000
            })
        }
    }
    let iconStyles = { color: "white", fontSize: "2rem", position: 'center' };

    return (
        <div className='add-to-favs-button-container'>
            <button onClick={handleChange}><MdStar style={iconStyles} /></button>
        </div>
    )
};