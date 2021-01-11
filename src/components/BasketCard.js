import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BasketContext, ThemeContext } from "../utils/context";

import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";
import InfoSharpIcon from "@material-ui/icons/InfoSharp";

import "../utils/styles/components/card.css";

export default function BasketCard(props) {
  const basket = useContext(BasketContext);
  const theme = useContext(ThemeContext);

  return (
    <div>
      <Card className='basketCardContainer full'>
        <CardMedia
          className='cover'
          image={props.object.artworkUrl100.replace("100x100bb", "200x200bb")}
        />
        <CardContent
          className='content'
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ width: "100%" }}>
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
          <div style={{ width: 150, textAlign: "center" }}>
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
                // basket.saveBasket(props.object);
              }}
            >
              <ClearIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      <Card className='basketCardContainer mobile'>
        <CardMedia
          className='cover'
          style={{ width: 100, height: 100 }}
          image={props.object.artworkUrl100}
        />

        <CardContent
          className='content'
          style={{
            // display: "flex",
            width: 180,
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 10,
            marginTop: 10,
            padding: 0
          }}
        >
          <div style={{ flexDirection: "column" }}>
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
              className={theme.theme ? "" : "dark-text"}
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
                // basket.saveBasket(props.object);
              }}
            >
              <ClearIcon />
            </IconButton>
          </div>
          <div style={{ width: 150, textAlign: "center" }}></div>

          <div></div>
        </CardContent>
      </Card>
    </div>
  );
}
