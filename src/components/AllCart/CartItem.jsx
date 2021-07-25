import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';


import { deleteFromCart, changeQuantity } from "../../Redux/Actions";
import "./CartItem.css";

const CartItem = ({ product, index }) => {
    const dispatch = useDispatch();
    const cartCss = (index) => {
        let cont = index % 3;
        switch (cont) {
            case 0: {
                return "card_container_one";
            }
            case 1: {
                return "card_container_two";
            }
            case 2: {
                return "card_container_three";
            }
            default:
                return "card_container_one";
        }
    };
    const [quantity, setQuantity] = useState(product.quantity);

    const userId = Cookies.get('id');

    const handleDeleteItem = () => dispatch(deleteFromCart(userId, product.productID ? product.productID : product.id));

    const handleChangeQuantity = e => {
        const { value } = e.target;
        if (value <= product.stock && value >= 1) {
            setQuantity(value);
            dispatch(changeQuantity(product, e.target.value, userId));
        };
    };

    return (
        <div className={cartCss(index)} key={index}>
            <div>
                <img className="cart_img" src={product.photo[0]} alt="Not found" />
            </div>
            <div className="cart_info">
                <h2>{product.name}</h2>
                <div className="cart_info_buttons">
                    <h3>Precio: {`$${product.price}`}</h3>
                    <input type="number" onChange={handleChangeQuantity} value={quantity} />
                </div>
            </div>
                <button onClick={handleDeleteItem} > X</button>
        </div>
    );
};

export default CartItem;
