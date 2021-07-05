import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL } from "../constants";

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
};

export const getProductDetail = (id) => {
    return (dispatch) => {
        fetch(`http://18.191.253.15:3000/products/${id}`)
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: response
        })) 
    }
};
