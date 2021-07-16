import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, RESTART_PRODUCTS, SET_FILTER_NAME, SET_CATEGORY_ID, SET_PAGE, SET_ORDER } from "../constants";
import {url} from '../../constantURL'

import axios from 'axios';



export function getAllProducts(name, page, orderBy , orderType, category) {
    return async function(dispatch) {
        var json = await axios(`${url}/products?page=${page}&name=${name}&orderBy=${orderBy}&orderType=${orderType}&category=${category}`);
        return dispatch({type: GET_ALL_PRODUCTS,payload: json.data})
    };
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

export const resetAllProductsHome = () => {
    return (dispatch) => {
        dispatch({
            type: RESTART_PRODUCTS,
        })
    }
}

export const setFilterName = (name) => {
    return (dispatch) =>{
       dispatch ({type: SET_FILTER_NAME, payload: name })

    }  
}

export const setCategoryId = (id) => {
    return (dispatch) =>{
       dispatch ({type: SET_CATEGORY_ID, payload: id })
    }  
}

export const setPage = (page) => {
    return (dispatch) =>{
       dispatch ({type: SET_PAGE, payload: page })
    }  
}

export const setOrder = (order) => {
    const or = order.split(" ")
    return (dispatch) =>{
        dispatch ({type: SET_ORDER, payload: or})
    }
}

export const updateCategory = (body) => {
    return (dispatch) => {
        axios.put(`${url}/category/update`,body)
        .then(()=>
        dispatch({
            type:null
        }))
        getAllCategories();
    }
}