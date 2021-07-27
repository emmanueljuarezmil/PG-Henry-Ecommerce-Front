import React from "react";
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Log from '../log/log';

import "./CartTotal.css";

const CartTotal = ({ total, handleGoToCheckout }) => {
  const userId = Cookies.get('id');
  let data = useSelector(state => state.user_address);

  return (
    <div>
      <div className="summary">
        <div className="summary_text">
          <label>ENVIO: </label>
          <h4>Gratis</h4>
          <label>TOTAL: </label>
          <h2>${total}</h2>
        </div>
        {
        userId ? data[0].length && data[1].length && data[2].length ? <button onClick={handleGoToCheckout}> Ir al checkout</button>
        : <p>Indica tu direccion postal</p> : <Log/>
      }
      </div>
    </div>
  );
};

export default CartTotal;