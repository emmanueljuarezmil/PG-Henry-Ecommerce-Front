import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../Redux/Actions';
import CarouselComponent from '../CarouselComponent/CarouselComponent';
import { addToCart } from '../../Redux/Actions/index';
// import Select from 'react-select'
// import Cart from '../Cart/Cart';

import './ProductDetail.css';

function ProductDetail({ match }) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product_detail);
    const cart = useSelector((state) => state.cart);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        dispatch(getProductDetail(match.params.id))
    }, [dispatch, match.params.id]);

    const prod = cart.find(element => element.id === product.id);
    const quant = prod ? prod.quantity : 0
    var prodStock = product.stock;
    const stockAvailable = product.stock - quant
    
    const onClick = () => {
        // const prod = cart.find(element => element.id === product.id);
        // const quant = prod ? prod.quantity : 0
        // var prodStock = product.stock - quant;
        if ((quantity + quant) > product.stock) {
            alert('No hay stock disponible para tu pedido')
            return setQuantity(0)
        };
        dispatch(addToCart({
            id: product.id,
            quantity
        }))
    };

    const onChange = (e) => {
        // const prod = cart.find(element => element.id === product.id);
        // const quant = prod ? prod.quantity : 0
        if ((quantity + quant) >= product.stock) {
            return setQuantity(0)       
        };
        setQuantity(Number(e.target.value));
    };
    

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
                    <h3>Stock disponible: {product.stock - quant}</h3>
                </div>
                <div>
                    <div>
                        <label>Selecciona la cantidad:</label>
                        {
                            quant < product.stock ?
                            <div>
                                {/* <Select></Select> */}
                                <input type="number" value={quantity} min={0} max={prodStock} onChange={(e) => onChange(e)} />
                                <button onClick={onClick}>Add to cart</button>
                            </div> :
                            <p>No hay mas disponible</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductDetail;