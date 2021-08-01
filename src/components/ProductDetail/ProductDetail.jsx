import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail, addToCart } from '../../Redux/Actions';
import CarouselComponent from '../CarouselComponent/CarouselComponent';
import { Fade } from 'react-awesome-reveal';
import Cookies from 'js-cookie';
import Share from '../Share/Share'
import Swal from 'sweetalert2';
import { AddToFavs } from '../addToFavourites/addToFavs';

import './ProductDetail.css';
import Review from '../Review/Review';
import RatingPromedio from '../RatingPromedio/RatingPromedio';
import ReviewsList from '../ReviewsList/ReviewsList';
 
function ProductDetail({ match }) {
    const dispatch = useDispatch(); 
    const { params: { id } } = match;
    const product = useSelector((state) => state.product_detail);
    const prod = JSON.parse(localStorage.getItem('cart') || "[]").find(element => element.id === id);
    const [quantity, setQuantity] = useState(prod?.quantity || 1);

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [dispatch, id]);

    const userId = Cookies.get('id');
    
    const addToCartBtn = () => {
        if ((Number(quantity)) <= product.stock) {
            setQuantity(Number(quantity) + 1);
            dispatch(addToCart({ ...product, quantity}, userId)); 
            Swal.fire({
                icon: 'success',
                text: 'Producto agregado exitosamente!',
                showConfirmButton: false,
                timer: 2000
              })
        };
    };

    function description () {
        return  {__html: product.description};
     }
 

    return (
        <Fade>
        <div className='detail_container'>
            <div className='image_container'> 
            <div className='detail_images'>
                <CarouselComponent images={product.photo}></CarouselComponent>
            </div>
            </div>
            <div className='detail_details'>
                <div className='detail_name'>
                    <h1>{product.name}</h1>
                </div>
                <div className='review_details'>
                    <RatingPromedio reviews={product.Reviews} />
                    </div>
                <div className='detail_price'>
                    <h3>${product.price}</h3>
                </div>
                <div className='add_cart_btn_div'>
                    { product.stock > 0 ? (
                        <button onClick={addToCartBtn}>Agregar al carrito</button>): null}
                </div>
                        <AddToFavs product={product} />
                <div className='detail_stock'>
                    <h3>Stock disponible: {product.stock}</h3>
                </div>
            </div>
            <div className='detail_description' dangerouslySetInnerHTML={description()}/>
            <Share name={product.name} description={product.description} id={product.id} photo={product.photo} />
        </div>
        <Review idProd={product.id}/>
        <ReviewsList reviews={product.Reviews}/>
        </Fade>
    )
};

export default ProductDetail;