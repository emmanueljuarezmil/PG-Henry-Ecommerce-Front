import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { deleteAllCart, getCartProducts, goToCheckout, getShippingAddress } from '../../Redux/Actions';
import InfoShipping from '../FormShipping/InfoShipping';
import './Cart.css'

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart);

    const userId = Cookies.get('id');

    useEffect(() => {
        dispatch(getShippingAddress(userId));
    }, [userId, dispatch]);

    // eslint-disable-next-line

    useEffect(() => {
        dispatch(getCartProducts(userId)); //  ID user + merge cart from DB
    }, [userId, dispatch]); // add userId to dependencies.

    const handleDeleteAll = () => dispatch(deleteAllCart(userId)); // userId hardcoded for now.
    const totalWithoutDesc = products.length && products.reduce((totalWithoutDesc, { price, quantity }) => totalWithoutDesc + (price * quantity), 0);
    const total = products.length && products.reduce((total, { price, quantity, perc_desc }) => total + price * quantity * (100 - perc_desc) / 100, 0);
    const desc = products.length && products.reduce((desc, { price, quantity, perc_desc }) => desc + perc_desc * price * quantity / 100, 0);
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
                        <h4>Subtotal: $ {totalWithoutDesc}</h4>
                        {
                            desc > 0 ?
                                <h3>Descuento total: -$ {Math.floor(desc)}</h3>
                                : <h3>Descuento total: 0</h3>
                        }
                        <div className='cart_total_div'>
                            <CartTotal total={Math.floor(total)} handleGoToCheckout={handleGoToCheckout} />
                        </div>
                        <div className='shipping_info_div'>
                            <InfoShipping />
                        </div>
                    </div>
                </div>
                : <h3 className='no_items'>No tienes productos agregados a tu carrito de compras</h3>
            }
        </div>
    );
};

export default Cart;
