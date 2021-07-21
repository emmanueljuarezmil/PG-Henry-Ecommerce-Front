import React from "react";

import "./CartTotal.css";

const CartTotal = ({ total, handleGoToCheckout }) => {

  return (
    <div>
      <div className="summary">
        <div className="summary_text">
          <label>ENVIO: </label>
          <h4>Gratis</h4>
          <label>TOTAL: </label>
          <h2>${total}</h2>
        </div>
        {/* Agregar renderizado condicional */}
        <button onClick={handleGoToCheckout}>Ir al checkout</button>
      </div>
    </div>
  );
};

export default CartTotal;