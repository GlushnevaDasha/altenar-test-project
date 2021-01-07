import React, { useState } from "react";

const BasketContext = React.createContext();

const defaultBasket = {
  basket: []
};

export const BasketProvider = ({ children, basket }) => {
  const [currentBasket, setCurrentBasket] = useState(basket || defaultBasket);

  const saveBasket = values => {
    setCurrentBasket(values);
  };

  return (
    <BasketContext.Provider value={{ basket: currentBasket, saveBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const BasketConsumer = BasketContext.Consumer;

export default BasketContext;
