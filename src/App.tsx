import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./page/Home";
import Basket from "./page/Basket";
import Product from "./page/Product";
import { BasketProvider } from "./utils/context/Basket";

export default function App() {
  return (
    <BasketProvider basket={[]}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shop' component={Basket} />
          <Route path='/product' component={Product} />
        </Switch>
      </Router>
    </BasketProvider>
  );
}
