import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, addToCart } from '../../Redux/Actions';
import CarouselComponent from '../CarouselComponent/CarouselComponent';
import { Fade } from 'react-awesome-reveal';

import './ProductDetail.css';
import Review from '../Review/Review';
 
function ProductDetail({ match }) {
    const dispatch = useDispatch();
    const { params: { id } } = match;
    const product = useSelector((state) => state.product_detail);
    const prod = JSON.parse(localStorage.getItem('cart') || "[]").find(element => element.id === id);
    const [quantity, setQuantity] = useState(prod?.quantity || 1);

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id]);

    const addToCartBtn = () => {
        if ((Number(quantity)) < product.stock) {
            setQuantity(Number(quantity) + 1);
            dispatch(addToCart({ ...product, quantity}, '4497b636-7cb5-4f96-8341-57c4ad7de88a')); // userId hardcoded for now.
        };
    };

    return (
        <Fade>
        <div className='detail_container'>
            <div className='detail_images'>
                <CarouselComponent images={product.photo}></CarouselComponent>
            </div>
            <div className='detail_details'>
                <div className='detail_name'>
                    <h1>{product.name}</h1>
                </div>
                <div className='detail_price'>
                    <h3>${product.price}</h3>
                </div>
                <div className='detail_description'>
                    <p>{product.description ? product.description : "There's no description available"}</p>
                </div>
                <div className='detail_stock'>
                    <h3>Stock disponible: {product.stock}</h3>
                </div>
                    <div>
                        { product.stock > 0 ? (
                            <button onClick={addToCartBtn}>+ Agregar al carrito</button>
                        )
                          : 
                          null
                            }
                    </div>
                
            </div>
        </div>
        <Review idProd={product.id}/>
        </Fade>
    )
};

export default ProductDetail;