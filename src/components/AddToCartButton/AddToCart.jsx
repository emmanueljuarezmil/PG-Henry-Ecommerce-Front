import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeUnityToCart, deleteToCart } from '../../Redux/Actions/index';


export function AddToCart(props) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);  
    const product = props.product  
    const productInCart = cart.find(el => el.id === product.id)
    const [quantity, setQuantity] = useState(productInCart?.quantity ? productInCart.quantity : 1);
    
    const onClick = (props) => {
        if ((Number(quantity) + productInCart?.quantity) > product.stock) {
            return alert('La cantidad deseada debe ser menor al Stock disponible')
            // return setQuantity(0)
        };
        dispatch(addToCart({
            name: product.name,
            id: product.id,
            quantity: Number(quantity),
            image: product.photo[0],
            price: product.price
        }))
    };
    const onChange = (e) => {
        if ((Number(quantity) + productInCart?.quantity) >= product.stock) {
            alert('La cantidad deseada debe ser menor al Stock disponible')
            return setQuantity(quantity - 1)
        };
        setQuantity(e.target.value);
    };

    const onClickRemove = () => {
        const quantity = productInCart.quantity
        if (quantity -1 < 0) {setQuantity(0)};
        if (quantity -1 === 0) {
            dispatch(deleteToCart({id: product.id}))
            setQuantity(0)
        }
        if (quantity -1 > 0) {
            dispatch(removeUnityToCart({
                name: product.name,
                id: product.id,
                quantity: quantity,
                image: product.photo[0],
                price: product.price
                })) 
            setQuantity(quantity -1)    
        }
    };

    const onClickDelete = () => {
        dispatch(deleteToCart({id: product.id}))
    };
    
    return(
        <div>                    
            <label>Cantidad:</label>
            <input type="number" value={quantity} min={1} max={product.stock} onChange={(e) => onChange(e)} />
            <button onClick={onClick}>Agregar a mi carrito</button>
            {
                !product.description ?
                <div>
                    <button onClick={onClickRemove}>Remover una unidad</button>           
                    <button onClick={onClickDelete}>Quitar del carrito</button>              
                </div> :
                null
            }
            {
                product.description ?
                <div>               
                    <span>Tienes {productInCart ? productInCart.quantity : 0} en tu carrito</span>
                </div> :
                null
            }
        </div>
    )
}