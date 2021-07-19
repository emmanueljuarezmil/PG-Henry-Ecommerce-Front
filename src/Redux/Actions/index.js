import { 
GET_ALL_PRODUCTS, 
GET_PRODUCT_DETAIL, 
GET_ALL_CATEGORIES, 
RESTART_PRODUCTS, 
SET_FILTER_NAME, 
SET_CATEGORY_ID, 
SET_PAGE, 
SET_ORDER,
GET_ALL_ORDERS,
GET_CART_PRODUCTS,
ADD_TO_CART,
GET_ORDER_DETAIL,
REST_TO_CART,
DELETE_ITEM_TO_CART
} from "../constants";
import {url} from '../../constantURL'

import axios from 'axios';


export function getAllProducts(name, page, orderBy , orderType, category) {
    return async function(dispatch) {
        var json = await axios(`${url}/products?page=${page}&name=${name}&orderBy=${orderBy}&orderType=${orderType}&category=${category}`);
        return dispatch({type: GET_ALL_PRODUCTS,payload: json.data})
    };
}
/*
export function getAllProducts(name, page, orderBy , orderType, category, token) {
    return async function(dispatch) {
        var json = await axios(`${url}/products?page=${page}&name=${name}&orderBy=${orderBy}&orderType=${orderType}&category=${category}`, {
            headers: {Authorization:  `Bearer ${token}`}
        });
        console.log(token)
        return dispatch({type: GET_ALL_PRODUCTS,payload: json.data})
    };
}
*/


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

export const getAllOrders= () => {
    return (dispatch) => {
        fetch(`${url}/orders/`)
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_ALL_ORDERS,
            payload: response
        })) 
    }
}

export const getCartProducts= (idUser)=>{
    return (dispatch) => {
        fetch (`${url}/cart/${idUser}`)
        .then((response)=> response.json())
        .then((response) => 
        dispatch({
            type: GET_CART_PRODUCTS,
            payload: response
        }))
    }
}

export const getOrderDetail = (id) => {
    return (dispatch) => {
        fetch(`${url}/orders/${id}`)
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_ORDER_DETAIL,
            payload: response
        })) 
    };
};

export const addToCart = (product) => {
    return (dispatch) =>{
        dispatch ({type: ADD_TO_CART, payload: product})
    }
}

export const removeUnityToCart = (product) => {
    return (dispatch) =>{
        dispatch ({type: REST_TO_CART, payload: product})
    }
}

export const deleteToCart = (product) => {
    return (dispatch) =>{
        dispatch ({type: DELETE_ITEM_TO_CART, payload: product})
    }
}