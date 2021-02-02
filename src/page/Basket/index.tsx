import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BasketContext, ThemeContext } from "../../utils/context";
import BasketCard from "../../components/Cards/BasketCard";
import { Typography } from "@material-ui/core";
import { ThemeButton, BackButton } from "../../components/IconButtons";

import "../../utils/styles/page/basket.css";
export default function BasketPage() {
  const basket = useContext(BasketContext);
  const theme = useContext(ThemeContext);
  const [schet, setSchet] = useState(0);

  useEffect(() => {
    getSumma(basket.basket);
  }, [basket.basket.length]);

  const getSumma = mas => {
    let summa = 0;
    mas.map(item => {
      summa += item.trackPrice;
    });
    setSchet(summa);
  };

  return (
    <div className={theme.theme ? "light" : "dark"}>
      <div className='page'>
        <div className='header'>
          <Link to='/'>
            <BackButton />
          </Link>
          <Typography
            component='h5'
            variant='h5'
            className={theme.theme ? "text" : "dark-text text"}
          >
            Kорзина
          </Typography>
          <ThemeButton />
        </div>
        <div>
          {basket.basket.length !== 0 ? (
            basket.basket.map((item, index) => (
              <BasketCard key={index} object={item} index={index} />
            ))
          ) : (
            <Typography
              component='h5'
              variant='h5'
              className={theme.theme ? "text" : "dark-text text"}
            >
              Добавьте понравившийся Вам товар
            </Typography>
          )}
        </div>
        {basket.basket.length !== 0 ? (
          <div className='schet'>
            <Typography
              component='h6'
              variant='h6'
              className={theme.theme ? "text" : "dark-text text"}
            >
              Итого: {schet} {" " + basket.basket[0].currency}
            </Typography>
          </div>
        ) : null}
      </div>
    </div>
  );
}
