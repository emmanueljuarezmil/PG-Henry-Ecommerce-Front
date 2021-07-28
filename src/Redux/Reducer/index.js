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
  CHANGE_QUANTITY,
  CART_FROM_LOCALSTORAGE_TO_DB,
  DELETE_ITEM_FROM_CART_LOCAL_STORAGE,
  CART_FROM_DB_TO_LOCALSTORAGE,
  ADD_TO_CART_FROM_DB,
  USER,
  CHANGE_ADDRESS,
  GET_ADDRESS,
  GET_ALL_USERS,
  GET_SEARCH_BAR_PRODUCTS
} from "../constants";

const initialState = {
  all_products: [],
  totalPages: 0, // Todos los productos
  actualPage: 1,
  filterName: "",
  filterCategory: "",
  orderBy: "",
  orderType: "",
  product_detail: {}, // Detalle del producto seleccionado
  categories: [], // Categorias de productos
  purchased_products: [], // Productos ya comprados (admin)
  // statuses: [],
  users: [], // Acceso a los usuarios del sitio (admin)
  pay_methods: [], // Metodos de pago
  purchases: [], // Historial de compra (user)
  reviews: [], // Reviews
  total_price: 0, // Precio total de la compra
  total_items: 0, // Total para cart
  orders: [],
  order_detail: [],
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  orderId: null,
  user:{},
  user_address: ['', '', '']
  // logged: false, //
  // admin: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        all_products: action.payload.products,
        totalPages: action.payload.totalPage,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        product_detail: action.payload,
      };
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case RESTART_PRODUCTS:
      return {
        ...state,
        all_products: [],
        actualPage: 1,
      };
    case SET_FILTER_NAME:
      return {
        ...state,
        filterName: action.payload,
        actualPage: 1,
      };
    case SET_CATEGORY_ID:
      return {
        ...state,
        filterCategory: action.payload,
        filterName: "",
        actualPage: 1,
      };
    case SET_PAGE:
      return {
        ...state,
        actualPage: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        orderBy: action.payload[0],
        orderType: action.payload[1],
        actualPage: 1,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case GET_ORDER_DETAIL:
      return {
        ...state,
        order_detail: action.payload.products,
      };
    case GET_CART_PRODUCTS:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART_FROM_DB:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case DELETE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(el => el.id !== action.payload),
      };
    case DELETE_ITEM_FROM_CART_LOCAL_STORAGE:
      return {
        ...state,
        cart: [...state.cart.map(el => {
          if(el.id === action.payload) {
            el.quantity = 0
            return el
          }
          else return el
        })]
      };
    case DELETE_ALL_CART:
      return {
        ...state,
        cart: [],
      };
    case CHANGE_QUANTITY:
      return {
        ...state,
        cart: action.payload,
      };
    case CART_FROM_LOCALSTORAGE_TO_DB:
      return {
        ...state,
        cart: action.payload.products,
        orderId: action.payload.orderId
      }
    case CART_FROM_DB_TO_LOCALSTORAGE:
      return {
        ...state,
        cart: [...action.payload.products],
        orderId: action.payload.orderId
      }
    case USER:
      return{
        ...state,
        user: action.payload
      }
    case CHANGE_ADDRESS:
      return{
        ...state,
        user_address: action.payload
      }
      case GET_ADDRESS:
        return{
          ...state,
          user_address: action.payload
        }
      case GET_ALL_USERS:
        return{
          ...state,
          users: [...action.payload]
        }
      case GET_SEARCH_BAR_PRODUCTS:
        return{
          ...state,
          searchProducts: [...action.payload]
        } 
    default:
      return state;
  }
};

export default rootReducer;