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
  CART_FROM_LOCALSTORAGE_TO_DB,
  CART_FROM_DB_TO_LOCALSTORAGE,
  GET_REVIEWS,
  DELETE_ITEM_FROM_CART_LOCAL_STORAGE,
  ADD_TO_CART_FROM_DB,
  USER,
  CHANGE_ADDRESS, 
  GET_ADDRESS,
  GET_ALL_USERS,
  GET_SEARCH_BAR_PRODUCTS
} from "../constants";
import { url } from "../../constantURL"
import { headers } from "../../controllers/GetHeaders"
import axios from "axios";

export function getAllProducts(name, page, orderBy, orderType, category) {
  return async function (dispatch) {
    var json = await axios(
      `${url}/products?page=${page}&name=${name}&orderBy=${orderBy}&orderType=${orderType}&category=${category}`
      );
    return dispatch({ type: GET_ALL_PRODUCTS, payload: json.data });
  };
}

export function getSearchBarProducts() {
  return async function (dispatch) {
    const {data} = await axios(
      `${url}/productsforsearchbar`
      );
    return dispatch({ type: GET_SEARCH_BAR_PRODUCTS, payload: data });
  };
}

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
    axios.put(`${url}/category/update`,
    body,
    { headers }).then(() =>
      dispatch({
        type: null,
      })
    );
    getAllCategories();
  };
};


export const getAllUsers = (users, name, admin) => {
  if(users) {
    return (dispatch) => {
      dispatch({type: GET_ALL_USERS, payload: users})
    }
  }
  else {
    return async function(dispatch){
      const users = await axios.get(`${url}/users?name=${name}&admin=${admin}`, {headers});
      return dispatch({type: GET_ALL_USERS, payload: users.data})
    }
  }
}


export const getAllOrders = (orders) => {
  if(!orders) {
    return (dispatch) => {
      fetch(`${url}/orders/`, {
        headers
      })
        .then((response) => response.json())
        .then((response) =>
          dispatch({
            type: GET_ALL_ORDERS,
            payload: response,
          })
        )
        .catch(err => console.error(err))
    };
  }
  else {
    return (dispatch) => {
      dispatch({
        type: GET_ALL_ORDERS,
        payload: orders,
      })
    }
  }
};

export const getCartProducts = (userId) => (dispatch) => {
  if (!userId) {
    let products = JSON.parse(localStorage.getItem('cart') || "[]");
    return dispatch({ type: GET_CART_PRODUCTS, payload: products })
  }
  if (userId) {
    return fetch(`${url}/cart/${userId}`, {
      headers
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('orderId', response.orderId)
        dispatch({
          type: GET_CART_PRODUCTS,
          payload: response.products,
        })
      }
      )
      .catch(err => console.error(err));
  };
};

export const getOrderDetail = (id) => {
  return (dispatch) => {
    fetch(`${url}/orders/${id}`, {
      headers
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: GET_ORDER_DETAIL,
          payload: response,
        })
      })
      .catch(err => console.error(err))
  };
};

export const addToCart = (product, userId) => dispatch => {
  if (!userId) {
    let products = JSON.parse(localStorage.getItem('cart') || "[]");
    let productFind = false;
    products = products.map((p) => {
      if (p.id === product.id) {
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
    return dispatch({ type: ADD_TO_CART, payload: products })
  }
  if (userId) {
    const body = { id: product.id, quantity: 1 }
    return axios.post(`${url}/cart/${userId}`,body,
      {headers}
    )
      .then((response) => {
        dispatch({ type: ADD_TO_CART_FROM_DB, payload: response.data });
      })
      .catch((error) => console.error(error));
  }
};

export const localStorageCartToDB = (userId) => async (dispatch) => {
  if (userId) {
    try {
      let body = JSON.parse(localStorage.getItem('cart') || "[]");
      axios.put(`${url}/orders/${userId}`, body, {
        headers: {
          ...headers, idUser: userId
        }
       })
        .then((response) => {     
          localStorage.setItem('orderId', response.data.orderId)
          dispatch({ type: CART_FROM_LOCALSTORAGE_TO_DB, payload: response.data });
        })
        .catch((error) => console.error(error))
      localStorage.removeItem('cart');
    } catch (e) {
      console.error('removeStorage: Error removing key cart from localStorage: ' + JSON.stringify(e));
    };
  };
};

export const DBcartToLocalStorage = (idUser) => async (dispatch) => {
  try {
    const {data} = await axios(`${url}/cart/${idUser}`, { headers })
    localStorage.setItem('cart', JSON.stringify(data.products))
    localStorage.setItem('orderId', data.orderId)
    dispatch({ type: CART_FROM_DB_TO_LOCALSTORAGE, payload: data })
  } catch (e) {
    console.error(e);
  };
};

export const deleteFromCart = (userId, idProduct) => async (dispatch) => {
  if (!userId) {
    let products = JSON.parse(localStorage.getItem('cart') || "[]")
    products = products.map(el => {
      if(el.id === idProduct) {
        el.quantity = 0
        return el
      }
      else return el
    })
    localStorage.setItem('cart', JSON.stringify(products));
    dispatch({ type: DELETE_ITEM_FROM_CART_LOCAL_STORAGE, payload: idProduct });
  }
  if (userId) {
    axios.delete(`${url}/cart/${userId}/${idProduct}`, {headers})
      .then(res => {
        dispatch({ type: DELETE_ITEM_FROM_CART, payload: idProduct });
      })
      .catch(err => console.error(err));
  };
};

export const deleteAllCart = (userId) => async (dispatch) => {
  localStorage.removeItem('cart');
  if (userId) {
    await axios.delete(`${url}/cart/${userId}`,
    { headers })
      .catch(err => console.error(err));
  };
  dispatch({ type: DELETE_ALL_CART });
};

export const goToCheckout = (products, userId) => async (dispatch) => {
  return axios.post(`${url}/checkout`,
    {products},
    {headers}
  )
    .then(res => {
      window.location = res.data.init_point;
      dispatch({ type: GO_TO_CHECKOUT, payload: res.data.init_point });
    })
    .catch(err => console.error(err));
};

export const changeQuantity = (product, quantity, userId) => async dispatch => {
  if (userId) {
    axios.put(`${url}/cart/${userId}`, 
    { ...product, quantity, idUser: userId },
    { headers })
      .then(res => {
        dispatch({ type: CHANGE_QUANTITY, payload: res.data.products });
      })
      .catch(err => console.error(err));
  }

  if (!userId) {
    let products = JSON.parse(localStorage.getItem('cart'));
    products = products.map((p) => {
      if (p.id === product.id) {
        p.quantity = quantity;
      }
      return p;
    });
    localStorage.setItem('cart', JSON.stringify(products));
    dispatch({ type: CHANGE_QUANTITY, payload: products });
  }
}

export const getReviews=(idProd)=>{
  return (dispatch)=>{
    fetch('', { 
      headers 
    })
    .then(response=>response.json())
    .then(response=> dispatch({
      payload:response,
      type:GET_REVIEWS
    }))
  }
}

export const saveUser=(obj)=>{
  return (dispatch)=>{
    dispatch({
      type:USER,
      payload:obj
    })
  }
}

export const updateShippingAddress = (idUser, shippingAddress) => async dispatch => {
  if (idUser) {
    axios.put(`${url}/users/updateShippingAddress/${idUser}`, 
    { shippingAddress })
      .then(res => {
        dispatch({ type: CHANGE_ADDRESS, payload: res });
      })
      .catch(err => console.error(err));
  }
}

export const getShippingAddress = (idUser) => async dispatch => {
  if (idUser) {
    axios.get(`${url}/users/getShippingAddress/${idUser}`)
      .then(res => {
        dispatch({ type: GET_ADDRESS, payload: res.data.shippingAddress });
      })
      .catch(err => console.error(err));
  }
}

