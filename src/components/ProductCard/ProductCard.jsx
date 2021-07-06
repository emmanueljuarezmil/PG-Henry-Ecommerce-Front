import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard(props) {
    return (
        <div className='container'>
        <div>
            <img src={props.product.photo} alt='' className='product_img' />
            <div>
                <h5 className='produc_name'>{props.product.name}</h5>
            </div>
            <p className='produc_price'>{props.product.price}</p>
        </div>
        <div>
            <Link to={`/product/${props.product.id}`}>
                <button className='button_card' type='submit'>
                    Read More
                </button>
            </Link>
            {/* Comment */}
        </div>
    </div>
    )
};

export default ProductCard;
