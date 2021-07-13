import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard(props) {
    return (
        <div>
            <div className='card_container'>
                <Link to={`/product/${props.product.id}`}
                className='card_container_link'
                style={{ textDecoration: 'none' }}>
                    <div className='card_container_item_img'>
                        {
                            props.product.photo[0] ?
                            <img src={props.product.photo[0]} alt='' className='product_img' /> :
                            <img src="https://shenandoahcountyva.us/bos/wp-content/uploads/sites/4/2018/01/picture-not-available-clipart-12.jpg" alt='' className='product_img' />   
                        }
                    </div>
                    <div className='card_container_item'>
                        <h5 className='product_price'>${props.product.price}</h5>
                        <h4 className='product_name'>{props.product.name}</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default ProductCard;
