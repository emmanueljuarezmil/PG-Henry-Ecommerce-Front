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
            <h3>${product.price}</h3>
            <div>
                <h2>Descripcion:</h2>
                <p>{product.descrip ? product.descrip : "There's no description available"}</p>
            </div>
            <div>
              <h3>Stock disponible:</h3><h4>{product.stock}</h4>
            </div>
        </div>
    )
}

export default ProductDetail