import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeUnityFromCart,
  deleteFromCart,
} from "../../Redux/Actions/index";
import "./AddToCart.css";
import Swal from 'sweetalert2';

export function AddToCart(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const product = props.product;
  const productInCart = cart.find((el) => el.id === product.id);
  const [quantity, setQuantity] = useState(1);

  const onClick = (props) => {
    if (product.stock === 0) return Swal.fire({
      icon: 'error',
      text: 'Lo sentimos, no hay stock de este producto',
    })

    if (Number(quantity) + productInCart?.quantity > product.stock) {
      return Swal.fire({
        icon: 'error',
        text: 'Lo sentimos, no hay stock de este producto',
      })
    }
    dispatch(
      addToCart({
        name: product.name,
        id: product.id,
        quantity: Number(quantity),
        image: product.photo[0],
        price: product.price,
        stock: product.stock,
      })
    )
    Swal.fire({
      icon: 'success',
      text: 'Producto agregado exitosamente!',
      showConfirmButton: false,
      timer: 2000
    })
  };
  const onChange = (e) => {
    if (Number(quantity) + productInCart?.quantity >= product.stock) {
      Swal.fire({
        icon: 'error',
        text: 'La cantidad deseada debe ser menor al stock disponible',
        showConfirmButton: false,
        timer: 2000
      })
      return setQuantity(quantity - 1);
    }
    setQuantity(e.target.value);
  };

  const onClickRemove = () => {
    const quantity = productInCart.quantity;
    if (quantity - 1 < 0) {
      setQuantity(0);
    }
    if (quantity - 1 === 0) {
      dispatch(deleteFromCart({ id: product.id }));
      setQuantity(0);
    }
    if (quantity - 1 > 0) {
      dispatch(
        removeUnityFromCart({
          name: product.name,
          id: product.id,
          quantity: quantity,
          image: product.photo[0],
          price: product.price,
        })
      );
      setQuantity(quantity - 1);
    }
  };

  const onClickDelete = () => {
    dispatch(deleteFromCart({ id: product.id }));
  };

  return (
    <div>
      <div className="add_to_cart">
        <div className="add_to_cart_quantity">
          <label className="quantity">Cantidad: </label>
          <input
            type="number"
            value={productInCart?.quantity}
            min={1}
            max={product.stock}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className="agregar_button" onClick={onClick}>
          +
        </button>
        {!product.description ? (
          <div>
            <button onClick={onClickRemove}>-</button>
            <button onClick={onClickDelete}>Quitar del carrito</button>
          </div>
        ) : null}
        {product.description ? (
          <div>
            <span>
              Tienes {productInCart ? productInCart.quantity : 0} de este
              producto en tu carrito
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
