import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeUnityToCart, deleteToCart } from '../../Redux/Actions/index';


export function AddToCart(props) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);  
    const product = props.product  
    // const product = useSelector((state) => state.product_detail);
    const [quantity, setQuantity] = useState(product.quantity ? product.quantity : 1);
    
    const onClick = (props) => {
        const prod = cart.find(element => element.id === product.id);
        // const quant = prod ? Number(prod.quantity) : 0
        if ((Number(quantity) + product.quantity) > product.stock) {
            return alert('La cantidad deseada debe ser menor al Stock disponible')
            // return setQuantity(0)
        };
        dispatch(addToCart({
            name: product.name,
            id: product.id,
            quantity,
            image: product.photo[0],
            price: product.price
        }))
    };
    console.log(props)
    const onChange = (e) => {
        // const prod = cart.find(element => element.id === product.id);
        // const quant = prod ? Number(prod.quantity) : 0
        if ((Number(quantity) + product.quantity) >= product.stock) {
            alert('La cantidad deseada debe ser menor al Stock disponible')
            return setQuantity(quantity - 1)
        };
        setQuantity(e.target.value);
    };

    const onClickRemove = (props) => {
        // const prod = cart.find(element => element.id === product.id);
        // const quant = prod ? Number(prod.quantity) : 0
        const quantity = product.quantity
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

    const onClickDelete = (props) => {
        dispatch(deleteToCart({id: product.id}))
    };
    
    return(
        <div>                    
            <label>Selecciona la cantidad:</label>
            <input type="number" value={quantity} min={1} max={product.stock} onChange={(e) => onChange(e)} />
            <div>
                <button onClick={onClick}>Agregar a mi carrito</button>
                {!product.description && 
                    <button onClick={onClickRemove}>Remover una unidad</button>           
                }
                {!product.description && 
                    <button onClick={onClickDelete}>Quitar del carrito</button>              
                }
            </div>
        </div>
    )
}