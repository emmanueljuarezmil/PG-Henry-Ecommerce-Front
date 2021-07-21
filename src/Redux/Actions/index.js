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
  DELETE_ITEM_FROM_CART,
  DELETE_ALL_CART,
  GO_TO_CHECKOUT,
  CHANGE_QUANTITY,
} from "../constants";
import { url } from "../../constantURL";

import axios from "axios";

export function getAllProducts(name, page, orderBy, orderType, category) {
  return async function (dispatch) {
    var json = await axios(
      `${url}/products?page=${page}&name=${name}&orderBy=${orderBy}&orderType=${orderType}&category=${category}`
    );
    return dispatch({ type: GET_ALL_PRODUCTS, payload: json.data });
  };
}

// export function getAllProducts(name, page, orderBy , orderType, category, headers) {
//     return async function(dispatch) {
//         // console.log(token)
//         var json = await axios(`${url}/products?page=${page}&name=${name}&orderBy=${orderBy}&orderType=${orderType}&category=${category}`, {
//             headers: headers
//         });
//         // console.log(token)
//         return dispatch({type: GET_ALL_PRODUCTS,payload: json.data})
//     };
// }

// export function getAllProducts(name, page, orderBy , orderType, category, user) {
//     return async function(dispatch) {
//         console.log(user)
//         var json = await axios(`${url}/products?page=${page}&name=${name}&orderBy=${orderBy}&orderType=${orderType}&category=${category}`, {
//             headers: {
//                 email: user?.email,
//                 userName: user?.name,
//                 hashedPassword: user?.sub
//             }
//         });
//         console.log(json)
//         return dispatch({type: GET_ALL_PRODUCTS,payload: json.data})
//     };
// }

/*
export function getAllProducts(name, page, orderBy , orderType, category, token) {
    return async function(dispatch) {
        var json = await axios(`${url}/products?page=${page}&name=${name}&orderBy=${orderBy}&orderType=${orderType}&category=${category}`, {
            headers: {
                Authorization:  `Bearer ${token}`,
                id: cookies.get('id')
            }
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
          payload: response,
        })
      );
  };
};

export const getAllCategories = () => {
  return (dispatch) => {
    fetch(`${url}/categories`)
      .then((response) => response.json())
      .then((response) =>
        dispatch({
          type: GET_ALL_CATEGORIES,
          payload: response,
        })
      );
  };
};

export const resetAllProductsHome = () => {
  return (dispatch) => {
    dispatch({
      type: RESTART_PRODUCTS,
    });
  };
};

export const setFilterName = (name) => {
  return (dispatch) => {
    dispatch({ type: SET_FILTER_NAME, payload: name });
  };
};

export const setCategoryId = (id) => {
  return (dispatch) => {
    dispatch({ type: SET_CATEGORY_ID, payload: id });
  };
};

export const setPage = (page) => {
  return (dispatch) => {
    dispatch({ type: SET_PAGE, payload: page });
  };
};

export const setOrder = (order) => {
  const or = order.split(" ");
  return (dispatch) => {
    dispatch({ type: SET_ORDER, payload: or });
  };
};

export const updateCategory = (body) => {
  return (dispatch) => {
    axios.put(`${url}/category/update`, body).then(() =>
      dispatch({
        type: null,
      })
    );
    getAllCategories();
  };
};

export const getAllOrders = () => {
  return (dispatch) => {
    fetch(`${url}/orders/`)
      .then((response) => response.json())
      .then((response) =>
        dispatch({
          type: GET_ALL_ORDERS,
          payload: response,
        })
      );
  };
};

export const getCartProducts = (userId) => {
  return (dispatch) => {
    if(userId) {
        return fetch(`${url}/cart/${userId}`)
        .then((response) => response.json())
        .then((response) =>
            dispatch({
            type: GET_CART_PRODUCTS,
            payload: response,
            })
        ); 
    }
  };
};

export const getOrderDetail = (id) => {
  return (dispatch) => {
    fetch(`${url}/orders/${id}`)
      .then((response) => response.json())
      .then((response) =>
        dispatch({
          type: GET_ORDER_DETAIL,
          payload: response,
        })
      );
  };
};

export const addToCart = (product, userId) => dispatch => {
  if (!userId) {  
      let products = JSON.parse(localStorage.getItem('cart') || "[]");
      let productFind = false;
      products = products.map((p) => {
            if(p.id === product.id) {
              productFind = true
              return {
                    ...p,
                    quantity: Number(p.quantity) + 1,
              };
            };
          return p;
      });
      if (!productFind) products.push(product);
      localStorage.setItem('cart', JSON.stringify(products))
    return (dispatch) => {
      dispatch({ type: ADD_TO_CART, payload: products });
    };
  }
  return axios.post(`${url}/cart/${userId}`, { id: product.id, quantity: 1 })
    .then((response) => {
      dispatch({ type: ADD_TO_CART, payload: response.data });
    })
    .catch((error) => console.error(error));
};

export const deleteFromCart = (id) => {
  const products = JSON.parse(localStorage.getItem('cart') || "[]").filter(prod => prod.id !== id);
  localStorage.setItem('cart', JSON.stringify(products));
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM_FROM_CART, payload: id });
  };
};

export const deleteAllCart = (userId) => async (dispatch) => {
    localStorage.removeItem('cart');
    if (userId) {
        await axios.delete(`${url}/cart/${userId}`)
            .catch(err => console.error(err));
    };
    dispatch({ type: DELETE_ALL_CART });
};

export const goToCheckout = (products, userId) => async (dispatch) => {
    return axios.post(`${url}/checkout`, { products })
        .then(res => {
            window.location = res.data.init_point;
            dispatch({ type: GO_TO_CHECKOUT, payload: res.data.init_point });
        })
        .catch(err => console.error(err));
};

export const changeQuantity = (product, quantity, userId) => async dispatch => {
  if (userId) {
    axios.put(`${url}/cart/${userId}`, { ...product, quantity, idUser: userId })
        .then(res => {
            dispatch({ type: CHANGE_QUANTITY, payload: res.data });
        })
        .catch(err => console.error(err));
  }
  let products = JSON.parse(localStorage.getItem('cart'));
  products = products.map((p) => {
    if (p.id === product.id) {
      p.quantity = quantity;
    }
    return p;
  });
  localStorage.setItem('cart', JSON.stringify(products));
  dispatch({ type: CHANGE_QUANTITY, payload: products });
};
