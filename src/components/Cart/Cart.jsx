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
                <div className='cart_container_column'>
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
                    </div>
                    <div className='summary'>
                    <div className='summary_text'>
                        <label>ENVIO: </label>
                        <h4>Gratis</h4>
                        <label>TOTAL: </label>
                        <h2>${Math.ceil(totalPrice)}</h2>
                        </div>
                    </div>
                </div>
                : <h3 className='no_items'>No tienes productos agregados a tu carrito de compras</h3>
            }
        </div>
        </Fade>
    )
}

export default Cart
