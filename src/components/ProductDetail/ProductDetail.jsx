import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../../Redux/Actions'
import CarouselComponent from '../CarouselComponent/CarouselComponent'
import './ProductDetail.css'
import {url} from '../../constantURL'
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { addToCart } from '../../Redux/Actions/index';

function ProductDetail({ match }) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product_detail)
    const [quantity,setQuantity]=useState(1);
    const { isAuthenticated } = useAuth0()

    useEffect(() => {
        dispatch(getProductDetail(match.params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // async function add (productID,){
    //     const body={id:product.id}
    //     try{
    //         axios.post(`${url}/cart/${product.id}`,);
    //     }
    // }

    function onSubmit (){        
        axios.post(`${url}/cart/${product.id}`, {
            id: product.id,
            quantity: quantity
        })
        }
    
    // function onSubmitNoRegister (product, quantity, e){
    //     e.preventdefault()
    //     dispatch(addToCart({
    //         id: product.id,
    //         quantity: quantity
    //     }))
    // }

    function onSubmitNoRegister (){
        dispatch(addToCart({
            id: product.id,
            quantity: quantity
        }))
    }

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
                <div>
                    {isAuthenticated && (
                     <div>
                     <label>Selecciona la cantidad:</label>
                     <input type="number" value={quantity} />
                     <button onClick={onSubmitNoRegister}>Add to cart</button>
                 </div>
                    )}
                    {!isAuthenticated && (                        
                        <div>
                            <label>Selecciona la cantidad:</label>
                            <input type="number" value={quantity} />
                            <button onClick={onSubmitNoRegister}>Add to cart</button>
                        </div>
                    )}               
                </div>
            </div>
        </div>
    )
}

export default ProductDetail