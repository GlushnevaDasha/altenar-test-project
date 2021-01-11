import React, { useContext, useState, useEffect } from "react";
import { BasketContext, ThemeContext } from "../../utils/context";
import { Grid } from "@material-ui/core";
import BasketCard from "../../components/BasketCard";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";

import { IconButton, Typography } from "@material-ui/core";
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
      <div className={basket.basket.length !== 0 ? " page" : ""}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div />
          <Typography component='h6' variant='h6' className='text'>
            Ваша корзина
          </Typography>
          <IconButton
            aria-label='menu'
            onClick={() => {
              theme.saveTheme(!theme.theme);
            }}
          >
            {theme.theme ? <BrightnessLowIcon /> : <BrightnessHighIcon />}
          </IconButton>
        </div>
        <Grid container direction='row' justify='center' alignItems='center'>
          {basket.basket.length !== 0 ? (
            basket.basket.map((item, index) => (
              <BasketCard key={index} object={item} index={index} />
            ))
          ) : (
            <div>У Вас еще нет покупок</div>
          )}
        </Grid>
        {basket.basket.length !== 0 ? (
          <div style={{ justifyContent: "flex-end", display: "flex" }}>
            <Typography component='h6' variant='h6' className='text'>
              Итого: {schet} {" " + basket.basket[0].currency}
            </Typography>
          </div>
        ) : null}
      </div>
    </div>
  );
}
