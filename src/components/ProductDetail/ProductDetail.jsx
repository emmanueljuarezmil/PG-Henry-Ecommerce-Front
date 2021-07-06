import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../../Redux/Actions'

function ProductDetail({ match }) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product_detail)

    useEffect(() => {
        dispatch(getProductDetail(match.params.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ( 
        <div>
            <div>
                <h1>{product.name}</h1>
            </div>
            <div>
                <img src={product.photo} alt='' />
            </div>
            <h5>Price: {product.price}</h5>
            <div>
                <h2>Description:</h2>
                <p>{product.description ? product.description : "There's no description available"}</p>
            </div>
            <div>
                <p>Stock available: {product.stock}</p>
            </div>
            <div>
                <p>Selled: {product.selled}</p>
            </div>
        </div>
    )
}

export default ProductDetail