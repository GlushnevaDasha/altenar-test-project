import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./page/Home";
import Basket from "./page/Basket";
import Product from "./page/Product";

import { BasketContext, ThemeContext } from "./utils/context";

export default function App() {
  const [currentBasket, setCurrentBasket] = useState([]);

  const saveBasket = values => {
    setCurrentBasket([...currentBasket, values]);
  };

  const deleteBasket = values => {
    currentBasket.splice(values, 1);
    setCurrentBasket([...currentBasket]);
  };

  const [currentTheme, setCurrentTheme] = useState(true);

  const saveTheme = values => {
    setCurrentTheme(values);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, saveTheme }}>
      <BasketContext.Provider
        value={{ basket: currentBasket, saveBasket, deleteBasket }}
      >
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/shop' component={Basket} />
            <Route path='/product' component={Product} />
          </Switch>
        </Router>
      </BasketContext.Provider>
    </ThemeContext.Provider>
  );
}
