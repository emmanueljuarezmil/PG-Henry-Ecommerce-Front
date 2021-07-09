
import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_FILTRATED_CATEGORIES } from "../constants";
import axios from 'axios';
import {url} from '../../constantURL'

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
            type: GET_FILTRATED_CATEGORIES,
            payload: response.data[0].Products
        })) 
    }
}