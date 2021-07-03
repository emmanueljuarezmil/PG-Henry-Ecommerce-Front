export const ADD_PRODUCT = 'ADD_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const GET_PRODUCT_BY_NAME = 'GET_PRODUCT_BY_NAME';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CATEGORY_BY_ID = 'GET_CATEGORY_BY_ID';
export const GET_SUB_CATEGORY_BY_NAME = 'GET_SUB_CATEGORY_BY_NAME';

export const addProduct = (obj) => {
    return (dispatch) =>
        fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then((answer) => answer.json())
            .then((answer) => {
                dispatch({
                    type: ADD_PRODUCT,
                    payload: answer
                })
            })
};

export const getProducts = () => {
    return (dispatch) =>
        fetch("http://localhost:3000/products")
            .then((answer) => answer.json())
            .then((answer) =>
                dispatch({
                    type: GET_PRODUCTS,
                    payload: answer
                }))
};

export const getProductDetail = (id) => {
    return (dispatch) =>
        fetch(`http://localhost:3000/products/${id}`)
            .then((answer) => answer.json())
            .then((answer) =>
                dispatch({
                    type: GET_PRODUCT_BY_ID,
                    payload: answer
                }))
};

export const getProductByName = (name) => {
    return (dispatch) =>
        fetch(`http://localhost:3000/products?name=${name}`)
            .then((answer) => answer.json())
            .then((answer) =>
                dispatch({
                    type: GET_PRODUCT_BY_NAME,
                    payload: answer
                }))
};

export const getCategories = () => {
    return (dispatch) =>
        fetch("http://localhost:3000/category")
            .then((answer) => answer.json())
            .then((answer) =>
                dispatch({
                    type: GET_CATEGORIES,
                    payload: answer
                }))
};

export const getCategoryDetail = (id) => {
    return (dispatch) =>
        fetch(`http://localhost:3000/category/${id}`)
            .then((answer) => answer.json())
            .then((answer) =>
                dispatch({
                    type: GET_CATEGORY_BY_ID,
                    payload: answer
                }))
};

export const getSubCategoryByName = (name) => {
    return (dispatch) =>
        fetch(`http://localhost:3000/category?sub=${name}`)
            .then((answer) => answer.json())
            .then((answer) =>
                dispatch({
                    type: GET_SUB_CATEGORY_BY_NAME,
                    payload: answer
                }))
};