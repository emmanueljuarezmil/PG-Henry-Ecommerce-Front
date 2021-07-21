import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { deleteAllCart, getCartProducts, goToCheckout } from '../../Redux/Actions';

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.cart);

    const userId = Cookies.get('id');

    console.log(userId)
    useEffect(() => {
        dispatch(getCartProducts(userId)); // userId hardcoded for now. Local storage ---> ID user + merge cart from DB
    }, [dispatch]); // add userId to dependencies.

    const handleDeleteAll = () => dispatch(deleteAllCart(userId)); // userId hardcoded for now.
    const total = products.reduce((total, { price, quantity }) => total + price * quantity, 0);
    const handleGoToCheckout = () => dispatch(goToCheckout(products, userId)); // userId hardcoded for now. If user is not logged in, ask for redirect to login route.

    return (
        <div>
            {
                products && products.length > 0 ?
                    <div>
                        <div>
                            <div>
                                {
                                    products.map((product, index) => (
                                        <CartItem product={product} key={product.id} index={index} />
                                    ))
                                }
                            </div>
                            <div>
                                <CartTotal total={total} handleGoToCheckout={handleGoToCheckout} />
                            </div>
                        </div>
                        <button onClick={handleDeleteAll} >Eliminar carrito</button>
                    </div>
                    : <h3 className='no_items'>No tienes productos agregados a tu carrito de compras</h3>
            }
        </div>
    );
};

export default Cart;