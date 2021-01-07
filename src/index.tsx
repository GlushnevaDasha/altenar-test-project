import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./page/Home";
import Basket from "./page/Basket";
import { ThemeProvider } from "./utils/context/Theme";
import { BasketProvider } from "./utils/context/Basket";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={true}>
      <BasketProvider basket={[] || []}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/shop' component={Basket} />
          </Switch>
        </Router>
      </BasketProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
