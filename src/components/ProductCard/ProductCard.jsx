import React from 'react';

import './ProductCard.css';

function ProductCard(props) {
    return (
        <div className='container'>
            <div>
                <div>
                    <img src={props.product.photo} alt='' className='product_img' />
                    <div>
                        <h5 className='produc_name'>{props.product.name}</h5>
                    </div>
                    <p className='produc_price'>{props.product.price}</p>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;
