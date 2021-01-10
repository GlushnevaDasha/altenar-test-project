import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../utils/context";
import "../../utils/styles/page/home.css";
import "../../utils/styles/page/product.css";
import { getParameterFromUrl } from "../../utils/functions";
import { getSearchByID } from "../../utils/api";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { IconButton, Typography } from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";

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

export default function Product() {
  const classes = useStyles();
  const theme = useContext(ThemeContext);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getData();
  }, [product.length]);

  const [isFeath, setFeath] = useState(true);

  async function getData() {
    setFeath(false);
    const id = getParameterFromUrl("id").toString();
    let data = await getSearchByID(id);
    if (data.error) {
      setProduct(product);
      setFeath(true);
    } else {
      setProduct(data.results);
      setFeath(true);
    }
  }

  return (
    <div className={theme.theme ? "white page" : "dark page"}>
      {console.log("theme product", theme.theme)}
      {product.length !== 0 ? (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div
            style={{
              backgroundImage: `url(${product[0].artworkUrl100.replace(
                "100x100bb",
                "500x500bb"
              )})`,
              width: 500,
              height: 500
            }}
          ></div>
          <div>
            <Typography component='h6' variant='h6' className='text'>
              {product[0].trackName}
            </Typography>
            <Typography
              variant='subtitle1'
              color='textSecondary'
              className='text'
            >
              {product[0].artistName}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {product[0].trackPrice > 0
                ? product[0].trackPrice
                : product[0].collectionPrice || product[0].collectionPrice}
              {" " + product[0].currency}
            </Typography>
            <div className={classes.controls}>
              {theme.direction === "rtl" ? (
                <IconButton
                  aria-label='previous'
                  onClick={() => {
                    basket.saveBasket(props.object);
                  }}
                >
                  <AddShoppingCartSharpIcon />
                </IconButton>
              ) : null}

              <IconButton
                aria-label='play/pause'
                onClick={() => {
                  document.location.href = product[0].previewUrl;
                }}
              >
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>

              {theme.direction === "rtl" ? null : (
                <IconButton
                  aria-label='next'
                  onClick={() => {
                    basket.saveBasket(props.object);
                  }}
                >
                  <AddShoppingCartSharpIcon />
                </IconButton>
              )}
            </div>
            <div>{product[0].longDescription}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
