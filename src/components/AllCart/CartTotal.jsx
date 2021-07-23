import React from "react";
import Cookies from 'js-cookie';
import Log from '../log/log';

import "./CartTotal.css";

const CartTotal = ({ total, handleGoToCheckout }) => {
  const userId = Cookies.get('id');
  return (
    <div>
      <div className="summary">
        <div className="summary_text">
          <label>ENVIO: </label>
          <h4>Gratis</h4>
          <label>TOTAL: </label>
          <h2>${total}</h2>
        </div>
        {/* Agregar renderizado condicional */
        userId?<button onClick={handleGoToCheckout}>Ir al checkout</button>
        : <Log/>}
      </div>
    </div>
  );
};

export default CartTotal;