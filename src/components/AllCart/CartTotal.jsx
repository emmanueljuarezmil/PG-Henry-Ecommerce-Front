import React from "react";
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Log from '../log/log';

import "./CartTotal.css";

const CartTotal = ({ total, handleGoToCheckout }) => {
  const userId = Cookies.get('id');
  let data = useSelector(state => state.user_address);
  const authenticatedByCode = useSelector(state => state.authenticatedByCode)

  return (
      <div className="summary_2">
        <div className="summary_text_2">
          <label>ENVIO: </label>
          <h4>Gratis</h4>
          <label>TOTAL: </label>
          <h2>${total}</h2>
        </div>
        {
        userId ? authenticatedByCode ? data && data[0].length && data[1].length && data[2].length ? <button onClick={handleGoToCheckout}> Ir al checkout</button>
        : <p>Indica tu direccion postal para realizar tu compra</p> : <p>Valida tu cuenta para poder realizar tu compra</p> : <Log/>
      }
      </div>
  );
};

export default CartTotal;