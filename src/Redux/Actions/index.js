import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_PRODUCT_BY_NAME } from "../constants";
import {url} from '../constantURL'

export const getAllProducts = () => {
    return (dispatch) => {
        fetch(`${url}/products`)
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response
        })) 
    }
}

export const getProductDetail = (id) => {
    return (dispatch) => {
        fetch(`${url}/products/${id}`)
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: response
        })) 
    };
};

export const getAllCategories = () => {
    return (dispatch) => {
        fetch(`${url}/categories`)
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: response
        })) 
    }
}
export const getProductByName=(name)=>{
    return (dispatch)=>{
        fetch(`${url}/products?name=${name}`)
        .then((response)=> response.json())
        .then((response)=>
        dispatch({
            type:GET_PRODUCT_BY_NAME,
            payload:response
        }))
    }
}
