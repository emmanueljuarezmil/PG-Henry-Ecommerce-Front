import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES } from "../constants";
import axios from 'axios';

export const getAllProducts = () => {
    return (dispatch) => {
        fetch("http://localhost:3000/products")
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
        fetch(`http://localhost:3000/products/${id}`)
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
        fetch("http://localhost:3000/categories")
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: response
        })) 
    }
}

export const getFiltratedCategories = (cat) => {
    if (cat ==='All'){
        return (dispatch) => {
            dispatch({
                type: 'RESTART_PRODUCTS',
            })
        }
    }
    return (dispatch) => {
        axios.get(`http://localhost:3000/category/p_name/${cat}`)
        .then((response) => 
        dispatch({
            type: 'GET_FILTRATED_CATEGORIES',
            payload: response.data[0].Products
        })) 
    }
}