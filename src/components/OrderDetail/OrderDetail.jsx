import React from 'react'
import { useSelector } from 'react-redux'

import './OrderDetail.css';

function OrderDetail() {
    const order = useSelector((state) => state.order_detail)
        return (
            <div>
                {order?.map(product => {
                    return (
                        <div>
                            <h3>{product.id}</h3>
                            <h4>{product.price}</h4>
                        </div>
                    )
                })}
            </div>
        )
    }

export default OrderDetail