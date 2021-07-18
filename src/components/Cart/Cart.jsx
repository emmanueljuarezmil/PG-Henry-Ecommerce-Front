import React from 'react'
import { useSelector } from 'react-redux'
import { AddToCart } from '../AddToCartButton/AddToCart';
import { CarouselComponent } from '../CarouselComponent/CarouselComponent'

import './Cart.css';

function Cart() {

var totalPrice = 0
const products = useSelector((state) => state.cart)

    return (
        <div>
            {products.length > 0 ?
                <div>
                    {products && products.map(product => {                        
                        totalPrice = totalPrice + (product.price * product.quantity)                        
                        return (
                            <div>
                                <div>
                                    <h2>{product.name}</h2>
                                    <img src={product.photo}/>
                                    <div>
                                        <label>Precio: </label>
                                        <h3>{`$${product.price}`}</h3>
                                    </div>
                                    <div>
                                        <label>Cantidad: </label>
                                        <h3>{product.quantity}</h3>
                                        <AddToCart product={product}/>
                                    </div>
                                </div>                        
                            </div>
                        )
                    })}
                    <div>
                        <h2>Summary</h2>
                        <label>TOTAL: </label>
                        <h4>{totalPrice}</h4>
                        <label>ENVIO: </label>
                        <h4>Gratis</h4>                        
                    </div>
                </div>
            : <h3>No tienes productos agregados a tu carrito de compras</h3>}
        </div>
    )
}

export default Cart
