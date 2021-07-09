
import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_PRODUCT_BY_NAME, RESTART_PRODUCTS, GET_FILTRATED_CATEGORIES } from "../constants";


const initialState = {
    all_products: [], // Todos los productos
    filtered_products:[],
    product_detail: {}, // Detalle del producto seleccionado
    product_search: [], // Resultados de la busqueda por search bar
    categories: [], // Categorias de productos
    product_by_categories: [], // Filtrado por categoria
    catalogue: {}, // Productos paginados
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
                all_products: action.payload
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

        case GET_PRODUCT_BY_NAME:
            return{
                ...state,
                product_search:action.payload
        case GET_FILTRATED_CATEGORIES: 
            return {
                ...state,
                filtered_products: action.payload
            }
        case RESTART_PRODUCTS: 
            return {
                ...state,
                filtered_products: []
            }
        default:
            return state
    }
}

export default rootReducer;
