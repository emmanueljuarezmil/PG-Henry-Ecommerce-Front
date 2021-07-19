import React from 'react'
import { useSelector } from 'react-redux'
import { AddToCart } from '../AddToCartButton/AddToCart'
import { Fade } from 'react-awesome-reveal';

import './Cart.css';

function Cart() {

    var totalPrice = 0
    let products = useSelector((state) => state.cart)

    const cartCss=(i)=>{
        let cont =i%3;
        switch(cont){
            case 0:{
                return 'card_container_one'
            }
            case 1:{
                return 'card_container_two'
            }
            case 2:{
                return 'card_container_three'
            }
            default:
                return 'card_container_one'
            
        }
    }

    return (
        <Fade>
        <div className='cart_container'>
            {products.length > 0 ?
                <div>
                    {products && products.map((product, i) => {
                        totalPrice = totalPrice + (product.price * product.quantity)
                        return (
                            <div className={cartCss(i)} key={i}>
                                <div>
                                    <img className='cart_img' src={product.photo} alt="Not found" />
                                </div>
                                <div className='cart_info'>
                                    <h2>{product.name}</h2>
                                    <div className='cart_info_buttons'>
                                        <h3>Precio: {`$${product.price}`}</h3>
                                        <AddToCart product={product}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div>
                        <h2>Summary</h2>
                        <label>TOTAL: </label>
                        <h4>${Math.ceil(totalPrice)}</h4>
                        <label>ENVIO: </label>
                        <h4>Gratis</h4>
                    </div>
                </div>
                : <h3>No tienes productos agregados a tu carrito de compras</h3>}
        </div>
        </Fade>
    )
}

export default Cart
