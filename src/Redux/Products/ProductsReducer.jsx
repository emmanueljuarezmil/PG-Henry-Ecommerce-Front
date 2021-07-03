
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
    // admin: false, // 
};

const products = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                ...state,
                product_created: action.payload
            }
        case 'GET_PRODUCTS':
            return {
                ...state,
                all_products: action.payload
            }
        case 'GET_PRODUCT_BY_ID':
            return {
                ...state,
                product_detail: action.payload
            }
        case 'GET_PRODUCT_BY_NAME':
            return {
                ...state,
                product_search: action.payload
            }
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'GET_CATEGORY_BY_ID':
            return {
                ...state,
                category_detail: action.payload
            }
        case 'GET_SUB_CATEGORY_BY_NAME':
            return {
                ...state,
                sub_categories: action.payload
            }
        default:
            return state
    }
};

export default products;


