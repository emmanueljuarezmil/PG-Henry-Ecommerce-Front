import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import products from '../Products/ProductsReducer';

const tool = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const Store = createStore(products, tool(applyMiddleware(thunk)))

export default Store