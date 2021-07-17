import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../Redux/Actions';
import CarouselComponent from '../CarouselComponent/CarouselComponent';
import { addToCart } from '../../Redux/Actions/index';
import Cart from '../Cart/Cart';
import { AddToCart } from '../AddToCartButton/AddToCart';

import './ProductDetail.css';

function ProductDetail({ match }) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product_detail);
    const cart = useSelector((state) => state.cart);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        dispatch(getProductDetail(match.params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const onClick = () => {
    //     const prod = cart.find(element => element.id === product.id);
    //     const quant = prod ? Number(prod.quantity) : 0
    //     if ((Number(quantity) + quant) > product.stock) {
    //         return alert('La cantidad deseada debe ser menor al Stock disponible')
    //         // return setQuantity(0)
    //     };
    //     dispatch(addToCart({
    //         name: product.name,
    //         id: product.id,
    //         quantity,
    //         image: product.photo[0],
    //         price: product.price


    //     }))
    // };

    // const onChange = (e) => {
    //     const prod = cart.find(element => element.id === product.id);
    //     const quant = prod ? Number(prod.quantity) : 0
    //     if ((Number(quantity) + quant) >= product.stock) {
    //         alert('La cantidad deseada debe ser menor al Stock disponible')
    //         return setQuantity(quantity - 1)
    //     };
    //     setQuantity(e.target.value);
    // };

    return (
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
                <AddToCart product={product}/>
                {/* <div>
                    <div>
                        <label>Selecciona la cantidad:</label>
                        <input type="number" value={quantity} min={1} max={product.stock} onChange={(e) => onChange(e)} />
                        <button onClick={onClick}>Add to cart</button>
                    </div>
                </div> */}
            </div>
        </div>
    )
};

export default ProductDetail;