import React from 'react';
import { useSelector } from 'react-redux';

import './OrderDetail.css';

function OrderDetail() {
    const order = useSelector((state) => state.order_detail)
    let price = 0;

    for (let i = 0; i < order.length; i++) {
        price = price + order[i].price
    };

    return (
        <div>
            {order?.map(product => {
                return (
                    <div>
                        <h3>{product.name}</h3>
                        <h4>${product.price}</h4>
                        <img src={product.photo[0]} alt={product.name}  />
                    </div>
                )
            })}
            <p>Total: ${price}</p>
        </div>
    )
};

export default OrderDetail;