
import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, RESTART_PRODUCTS, SET_FILTER_NAME, SET_CATEGORY_ID, SET_PAGE, SET_ORDER } from "../constants";


const initialState = {
    all_products: [],
    totalPages:0, // Todos los productos
    actualPage:1,
    filterName: '',
    filterCategory:'', 
    orderBy: '',
    orderType: '',
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
            }
        case GET_PRODUCT_DETAIL: 
            return {
                ...state,
                product_detail: action.payload
            }    
        case GET_ALL_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            }
        case RESTART_PRODUCTS: 
            return {
                ...state,
                all_products: [],
                actualPage: 1

            }
        case SET_FILTER_NAME:
            return {
                ...state,
                filterName: action.payload,
                actualPage: 1
    
            }
        case SET_CATEGORY_ID:
        return {
            ...state,
            filterCategory: action.payload,
            filterName: '',
            actualPage: 1
        }
        case SET_PAGE:
            return {
                ...state,
                actualPage: action.payload,
            }
        case SET_ORDER:
            return {
                ...state,
                orderBy: action.payload[0],
                orderType: action.payload[1],
                actualPage: 1
            }
        default:
            return state
    }
}

export default rootReducer;
