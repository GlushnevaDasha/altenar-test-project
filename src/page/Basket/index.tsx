import React, { useContext } from "react";
import BasketContext from "../../utils/context/Basket";
import { Grid } from "@material-ui/core";
import Card from "../../components/Card";
export default function Basket() {
  const basket = useContext(BasketContext);
  return (
    <div className={basket.basket.length === 0 ? "page" : null}>
      {console.log("basket.basket", basket.basket)}
      <Grid container direction='row' justify='center' alignItems='center'>
        {basket.basket.length !== 0 ? (
          basket.basket.map((item, index) => <Card key={index} object={item} />)
        ) : (
          <div>У Вас еще нет покупок</div>
        )}
      </Grid>
    </div>
  );
}
