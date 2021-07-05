import { GET_ALL_PRODUCTS } from "../constants";

const initialState = {
    all_products: [], // Todos los productos
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
       
        default:
            return state
    }
}

export default rootReducer;
