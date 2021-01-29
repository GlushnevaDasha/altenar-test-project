import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BasketContext, ThemeContext } from "../../utils/context";

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";
import InfoSharpIcon from "@material-ui/icons/InfoSharp";

import "../utils/styles/components/basketCard.css";

export default function BasketCard(props) {
  const basket = useContext(BasketContext);
  const theme = useContext(ThemeContext);

  return (
    <div>
      <Card className='basketCardContainer full'>
        <CardMedia
          className='cover-basket'
          image={props.object.artworkUrl100}
        />
        <CardContent className='content web-content'>
          <div className='width-100'>
            <Typography
              component='h6'
              variant='h6'
              className={theme.theme ? "text" : "dark-text text"}
            >
              {props.object.trackName || props.object.collectionName}
            </Typography>
            <Typography
              variant='subtitle1'
              color='textSecondary'
              className={theme.theme ? "text" : "dark-text text"}
            >
              {props.object.artistName}
            </Typography>
          </div>
          <div>
            <Link to={`/product/?id=${props.object.trackId}`}>
              <IconButton
                aria-label='previous'
                className={theme.theme ? "" : "dark-text"}
              >
                <InfoSharpIcon />
              </IconButton>
            </Link>
          </div>
          <div className='priceContent'>
            <Typography
              variant='subtitle1'
              color='textSecondary'
              className={theme.theme ? "" : "dark-text"}
            >
              {props.object.trackPrice > 0
                ? props.object.trackPrice
                : props.object.collectionPrice || props.object.collectionPrice}
              {" " + props.object.currency}
            </Typography>
          </div>

          <div>
            <IconButton
              aria-label='next'
              className={theme.theme ? "" : "dark-text"}
              onClick={() => {
                basket.deleteBasket(props.index);
              }}
            >
              <ClearIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      <Card className='basketCardContainer mobile'>
        <CardMedia
          className='cover-basket'
          image={props.object.artworkUrl100}
        />

        <CardContent className='content mobile-content'>
          <div className='column'>
            <Typography
              component='h7'
              variant='h7'
              className={theme.theme ? "text" : "dark-text text"}
            >
              {props.object.trackName || props.object.collectionName}
            </Typography>
            <div style={{ marginTop: 10 }}>
              <Typography
                component='h8'
                variant='h8'
                color='textSecondary'
                className={theme.theme ? "text" : "dark-text text"}
              >
                {props.object.artistName}
              </Typography>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/product/?id=${props.object.trackId}`}>
              <IconButton
                aria-label='previous'
                className={theme.theme ? "" : "dark-text"}
              >
                <InfoSharpIcon />
              </IconButton>
            </Link>
            <Typography
              variant='subtitle1'
              color='textSecondary'
              className={theme.theme ? "price-text" : "dark-text price-text"}
            >
              {props.object.trackPrice > 0
                ? props.object.trackPrice
                : props.object.collectionPrice || props.object.collectionPrice}
              {" " + props.object.currency}
            </Typography>
            <IconButton
              aria-label='next'
              className={theme.theme ? "" : "dark-text"}
              onClick={() => {
                basket.deleteBasket(props.index);
              }}
            >
              <ClearIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
