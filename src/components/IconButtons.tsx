import React, { useContext } from "react";
import { BasketContext, ThemeContext } from "../utils/context";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import { IconButton, Badge } from "@material-ui/core";
import {
  ShoppingCart,
  BrightnessHigh,
  BrightnessLow,
  ArrowBack,
  AddShoppingCartSharp
} from "../asets/icons";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px"
    }
  })
)(Badge);

export const ShoppingCartButton = () => {
  const theme = useContext(ThemeContext);
  const basket = useContext(BasketContext);
  return (
    <IconButton aria-label='cart' className={theme.theme ? "" : "dark-text"}>
      <StyledBadge badgeContent={basket.basket.length} color='secondary'>
        <ShoppingCart />
      </StyledBadge>
    </IconButton>
  );
};

export const ThemeButton = () => {
  const theme = useContext(ThemeContext);
  const changeTheme = () => {
    theme.saveTheme(!theme.theme);
  };
  return (
    <IconButton
      aria-label='menu'
      className={theme.theme ? "" : "dark-text"}
      onClick={changeTheme}
    >
      {theme.theme ? <BrightnessLow /> : <BrightnessHigh />}
    </IconButton>
  );
};

export const BackButton = () => {
  const theme = useContext(ThemeContext);
  return (
    <IconButton aria-label='menu' className={theme.theme ? "" : "dark-text"}>
      <ArrowBack />
    </IconButton>
  );
};
export const AddShoppingCart = (product: any) => {
  const theme = useContext(ThemeContext);
  const basket = useContext(BasketContext);
  const addProduct = () => {
    basket.saveBasket(product);
  };
  return (
    <IconButton
      aria-label='previous'
      className={theme.theme ? "" : "dark-text"}
      onClick={addProduct}
    >
      <AddShoppingCartSharp />
    </IconButton>
  );
};
