import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard(props) {
    return (
        <div>
            <div className='card_container'>
                <Link to={`/product/${props.product.id}`} style={{ textDecoration: 'none' }}>
                    <img src={props.product.photo} alt='' className='product_img' />
                    <h4 className='produc_name'>{props.product.name}</h4>
                    <h5 className='produc_price'>${props.product.price}</h5>
                </Link>
            </div>
        </div>
    )
};

export default ProductCard;
