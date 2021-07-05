import { GET_ALL_PRODUCTS } from "../constants";

export const getAllProducts = () => {
    return (dispatch) => {
        fetch("http://18.191.253.15:3000/products")
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response
        })) 
    }
}