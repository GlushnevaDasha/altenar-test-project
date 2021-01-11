import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BasketContext } from "../utils/context";

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

  return (
    <Card className='basketCardContainer'>
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
        </div>
        <div>
          <Link to={`/product/?id=${props.object.trackId}`}>
            <IconButton aria-label='previous'>
              <InfoSharpIcon />
            </IconButton>
          </Link>
        </div>
        <div style={{ width: 150, textAlign: "center" }}>
          <Typography variant='subtitle1' color='textSecondary'>
            {props.object.trackPrice > 0
              ? props.object.trackPrice
              : props.object.collectionPrice || props.object.collectionPrice}
            {" " + props.object.currency}
          </Typography>
        </div>

        <div>
          <IconButton
            aria-label='next'
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
  );
}
