import React from "react";
import axios from 'axios';
import {url} from '../constantURL'
import { headers } from "../../controllers/GetHeaders";





export function AddToFavs (props){
    
    async function handleChange(){
        const response = await axios.post(`${url}/users/favs`, {idProduct: props.product.id}, {headers})
        console.log(response)
    }

    return(
        <div>
            <button onClick={handleChange} >Agregar a favoritos</button>
        </div>
    )
}