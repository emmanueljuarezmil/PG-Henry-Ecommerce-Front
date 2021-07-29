import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { deleteAllCart, getCartProducts, goToCheckout, getShippingAddress } from '../../Redux/Actions';
import FormShipping from '../FormShipping/FormShipping'
import InfoShipping from '../FormShipping/InfoShipping';
import './Cart.css'

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart);
    
    const userId = Cookies.get('id');

    const [flag, setFlag] = useState('Hay direccion');

    useEffect(() => {
        dispatch(getShippingAddress(userId));
    }, [userId, dispatch]);

    // eslint-disable-next-line
    const onClick = () => {
        setFlag('No hay direccion')
    }

    useEffect(() => {
        dispatch(getCartProducts(userId)); //  ID user + merge cart from DB
    }, [userId, dispatch]); // add userId to dependencies.

    const handleDeleteAll = () => dispatch(deleteAllCart(userId)); // userId hardcoded for now.
    const total = products.length && products.reduce((total, { price, quantity }) => total + price * quantity, 0);
    const handleGoToCheckout = () => dispatch(goToCheckout(products, userId)); // userId hardcoded for now. If user is not logged in, ask for redirect to login route.
    const productsToShow = products.filter(product => product.quantity > 0)
    return (
        <div>
            {productsToShow && productsToShow.length > 0 ?
                <div className='cart_total_items'>
                    {/* <div> */}
                        <div className='cart_prods_10'>
                            {
                                productsToShow.map((product, index) => (
                                    <CartItem product={product} key={product.id} index={index} userId={userId} />
                                ))
                            }
                        </div>
                        <button onClick={handleDeleteAll} className='delete_cart_btn'>Eliminar carrito</button>
                        <div className='cart_total_div'>
                            <CartTotal total={total} handleGoToCheckout={handleGoToCheckout} />
                        </div>
                        <div className='shipping_info_div'>
                        {flag === 'Hay direccion' ? 
                            <div>
                                <InfoShipping/>
                            </div> 
                            : 
                            <FormShipping/>}
                        </div>
                    {/* </div> */}
                </div>
                : <h3 className='no_items'>No tienes productos agregados a tu carrito de compras</h3>
            }
        </div>
    );
};

export default Cart;
