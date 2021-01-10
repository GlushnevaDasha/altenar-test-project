import React, { useContext } from "react";
import BasketContext from "../utils/context/Basket";
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

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";
import InfoSharpIcon from "@material-ui/icons/InfoSharp";

import "../utils/styles/components/card.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    playIcon: {
      height: 38,
      width: 38
    }
  })
);

export default function Cards(props) {
  const classes = useStyles();
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
        <div className={classes.controls}>
          <IconButton
            aria-label='previous'
            onClick={() => {
              theme.direction === "rtl"
                ? basket.saveBasket(props.object)
                : (document.location.href = "/product");
              console.log("basket", basket);
            }}
          >
            {theme.direction === "rtl" ? (
              <AddShoppingCartSharpIcon />
            ) : (
              <InfoSharpIcon />
            )}
          </IconButton>
          <IconButton aria-label='play/pause'>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton
            aria-label='next'
            onClick={() => {
              theme.direction === "rtl"
                ? (document.location.href = "/product")
                : basket.saveBasket(props.object);
              console.log("basket", basket);
            }}
          >
            {theme.direction === "rtl" ? (
              <InfoSharpIcon />
            ) : (
              <AddShoppingCartSharpIcon />
            )}
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
