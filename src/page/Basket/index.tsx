import React, { useContext, useState, useEffect } from "react";
import { BasketContext, ThemeContext } from "../../utils/context";
import { Grid } from "@material-ui/core";
import Card from "../../components/Card";

export default function BasketPage() {
  const basket = useContext(BasketContext);
  const theme = useContext(ThemeContext);
  const [schet, setSchet] = useState(0);

  useEffect(() => {
    getSumma(basket.basket);
  }, [schet]);

  const getSumma = mas => {
    let summa = 0;
    mas.map(item => {
      summa += item.trackPrice;
    });
    setSchet(summa);
  };

  return (
    <div className={basket.basket.length !== 0 ? "page" : ""}>
      {console.log("basket", basket.basket.length)}
      {console.log("theme", theme)}
      <Grid container direction='row' justify='center' alignItems='center'>
        {basket.basket.length !== 0 ? (
          basket.basket.map((item, index) => <Card key={index} object={item} />)
        ) : (
          <div>У Вас еще нет покупок</div>
        )}
      </Grid>
      Итого: {schet}
    </div>
  );
}
