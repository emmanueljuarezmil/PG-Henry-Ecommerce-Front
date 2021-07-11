import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_PRODUCT_BY_NAME, GET_FILTRATED_CATEGORIES, RESTART_PRODUCTS } from "../constants";
import {url} from '../constantURL'


import axios from 'axios';


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
        fetch(`${url}/products/p/${id}`)
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


export const getFiltratedCategories = (cat) => {
    if (cat ==='All'){
        return (dispatch) => {
            dispatch({
                type: RESTART_PRODUCTS,
            })
        }
    }
    return (dispatch) => {
        axios.get(`${url}/category/p_name/${cat}`)
        .then((response) => 
        dispatch({
            type: GET_FILTRATED_CATEGORIES,
            payload: response.data[0].Products
        })) 
    }
}

export const resetAllProductsHome = () => {
    return (dispatch) => {
        dispatch({
            type: RESTART_PRODUCTS,
        })
    }
}