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
                    <input type="number" onChange={handleChangeQuantity} value={quantity} />
                    <div>
                        <h3>Precio unitario: {`$ ${product.price}`}</h3>
                        {product.perc_desc > 0 ?
                        <div>
                        <h3>Descuento: {product.perc_desc}%</h3>
                        <h3>Descuento unitario: {`$ ${Math.floor(product.perc_desc*product.price/100)}`}</h3>
                        </div>
                        : <div>
                            <h3>Descuento: -</h3>
                            <h3>Descuento unitario: -</h3>
                        </div>}
                    </div>
                </div>
            </div>
            <button onClick={handleDeleteItem} className='delete_item_btn'> X</button>
        </div>
    );
};

export default CartItem;
