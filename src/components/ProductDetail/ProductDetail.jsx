import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../../Redux/Actions'
import './ProductDetail.css'

function ProductDetail({ match }) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product_detail)

    useEffect(() => {
        dispatch(getProductDetail(match.params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='detail_container'>
            <div className='detail_images'>
                <img src={product.photo}
                    alt='Img not found'
                    className='detail_images_item' />
            </div>
            <div className='detail_details'>
                <div className='detail_name'>
                    <h1>{product.name}</h1>
                </div>
                <div className='detail_price'>
                    <h3>${product.price}</h3>
                </div>
                <div className='detail_description'>
                    <p>{product.descrip ? product.descrip : "There's no description available"}</p>
                </div>
                <div className='detail_stock'>
                    <h3>Stock disponible: {product.stock}</h3>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail