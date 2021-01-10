import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BasketContext } from "../utils/context";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme
} from "@material-ui/core/styles";

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";

import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import InfoSharpIcon from "@material-ui/icons/InfoSharp";

import "../utils/styles/components/card.css";

export default function Cards(props) {
  const theme = useTheme();
  const basket = useContext(BasketContext);

  return (
    <Card className='cardContainer'>
      <div className='details'>
        <CardContent className='content'>
          <Typography component='h6' variant='h6' className='text'>
            {props.object.trackName || props.object.collectionName}
          </Typography>
          <Typography
            variant='subtitle1'
            color='textSecondary'
            className='text'
          >
            {props.object.artistName}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {props.object.trackPrice > 0
              ? props.object.trackPrice
              : props.object.collectionPrice || props.object.collectionPrice}
            {" " + props.object.currency}
          </Typography>
        </CardContent>
        <div className='controls'>
          <Link to={`/product/?id=${props.object.trackId}`}>
            <IconButton aria-label='previous'>
              <InfoSharpIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label='next'
            onClick={() => {
              basket.saveBasket(props.object);
            }}
          >
            <AddShoppingCartSharpIcon />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className='cover'
        image={props.object.artworkUrl100.replace("100x100bb", "200x200bb")}
      />
    </Card>
  );
}
