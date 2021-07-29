import React from "react";
import axios from 'axios';
import { url } from '../constantURL'
import { headers } from "../../controllers/GetHeaders";
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

    return (
        <div>
            <button onClick={handleChange} >Agregar a favoritos</button>
        </div>
    )
};