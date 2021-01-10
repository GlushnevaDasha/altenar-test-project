import React, { useState, useEffect } from "react";

const BasketContext = React.createContext();

const defaultBasket = {
  basket: []
};

export const BasketProvider = ({ children, basket }) => {
  const [currentBasket, setCurrentBasket] = useState(basket || defaultBasket);

  useEffect(() => {
    console.log("currentBasket", currentBasket);
  }, [currentBasket.length]);

  const saveBasket = values => {
    const data = basket;
    data.push(values);
    setCurrentBasket(data);
  };

  return (
    <BasketContext.Provider value={{ basket: currentBasket, saveBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const BasketConsumer = BasketContext.Consumer;

export default BasketContext;
