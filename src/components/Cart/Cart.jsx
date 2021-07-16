import React from 'react'
import { useSelector } from 'react-redux'
import { CarouselComponent } from '../CarouselComponent/CarouselComponent'

import './Cart.css';

function Cart() {

const products = useSelector((state) => state.cart)

    return (

        <div>
            {products?.map(product => {
                return (
                    <div>
                        
                    </div>

                )
            })}
        </div>
    )
}

export default Cart
