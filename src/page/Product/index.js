import React, { useState, useContext, useEffect } from "react";
import FastAverageColor from "fast-average-color";
import { ThemeContext, BasketContext } from "../../utils/context";
import { getParameterFromUrl } from "../../utils/functions";
import { getSearchByID } from "../../utils/api";

import { IconButton, Typography } from "@material-ui/core";

import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";

import "../../utils/styles/page/product.css";

export default function Product() {
  const theme = useContext(ThemeContext);
  const basket = useContext(BasketContext);
  const [product, setProduct] = useState([]);
  const [color, setColor] = useState({});
  useEffect(() => {
    getData();
    if (product.length !== 0) {
      const fac = new FastAverageColor();

      fac
        .getColorAsync(product[0].artworkUrl100)
        .then(colors => {
          setColor(colors);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [product.length]);

  const [isFeath, setFeath] = useState(false);

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
    <div>
      <div className={theme.theme ? "white full-page" : "dark full-page"}>
        {isFeath ? (
          <div class='page'>
            <div className='center'>
              <div
                className={
                  product[0].kind === "feature-movie"
                    ? "poster-video"
                    : "poster-sound"
                }
                style={{
                  backgroundImage: `url(${product[0].artworkUrl100.replace(
                    "100x100bb",
                    "450x450bb"
                  )})`
                }}
              />
              <div>
                <div className='name-container'>
                  <Typography
                    component='h6'
                    variant='h6'
                    className={theme.theme ? "text" : "dark-text text"}
                  >
                    {product[0].trackName}
                  </Typography>
                  <IconButton
                    aria-label='menu'
                    className={theme.theme ? "" : "dark-text"}
                    onClick={() => {
                      theme.saveTheme(!theme.theme);
                    }}
                  >
                    {theme.theme ? (
                      <BrightnessLowIcon />
                    ) : (
                      <BrightnessHighIcon />
                    )}
                  </IconButton>
                </div>
                <Typography
                  variant='subtitle1'
                  color='textSecondary'
                  className={theme.theme ? "text" : "dark-text text"}
                >
                  {product[0].artistName}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    className={theme.theme ? "" : "dark-text"}
                  >
                    {product[0].trackPrice > 0
                      ? product[0].trackPrice
                      : product[0].collectionPrice ||
                        product[0].collectionPrice}
                    {" " + product[0].currency}
                  </Typography>{" "}
                  <IconButton
                    aria-label='previous'
                    className={theme.theme ? "" : "dark-text"}
                    onClick={() => {
                      basket.saveBasket(product[0]);
                    }}
                  >
                    <AddShoppingCartSharpIcon />
                  </IconButton>
                </div>

                <video controls name='media' className='video-container'>
                  <source
                    src={`${product[0].previewUrl}`}
                    type={
                      product[0].kind === "feature-movie"
                        ? "video/x-m4v"
                        : "audio/x-m4a"
                    }
                  />
                </video>
              </div>
            </div>
            <div>
              <Typography
                variant='subtitle1'
                color='textSecondary'
                className={theme.theme ? "" : "dark-text"}
              >
                {product[0].longDescription}
              </Typography>
            </div>
          </div>
        ) : null}
      </div>

      <div className='mobile-page'>
        {isFeath ? (
          <div id='cont'>
            <div className='center'>
              <div
                id='poster'
                className={
                  product[0].kind === "feature-movie"
                    ? "poster-video"
                    : "poster-sound"
                }
                style={{
                  backgroundImage: `url(${product[0].artworkUrl100.replace(
                    "100x100bb",
                    "450x450bb"
                  )})`
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop:
                      product[0].kind === "feature-movie" ? "70vw" : "60vw",
                    paddingBottom:
                      product[0].kind === "feature-movie" ? "0vw" : "35vw",
                    paddingLeft: 10,
                    paddingRight: 10,
                    background: `linear-gradient(rgba(0, 0, 0, 0) 25% ,${color.rgba} 50%, ${color.rgba} 100% )`
                  }}
                >
                  <video
                    controls
                    name='media'
                    className={
                      product[0].kind === "feature-movie"
                        ? "video-container"
                        : "audio-container"
                    }
                  >
                    <source
                      src={`${product[0].previewUrl}`}
                      type={
                        product[0].kind === "feature-movie"
                          ? "video/x-m4v"
                          : "audio/x-m4a"
                      }
                    />
                  </video>

                  <div className='name-container'>
                    <Typography
                      component='h6'
                      variant='h6'
                      className={color.isLight ? "" : "dark-text"}
                    >
                      {product[0].trackName}
                    </Typography>
                  </div>
                  <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    className={color.isLight ? "text" : "dark-text text"}
                  >
                    {product[0].artistName}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      color='textSecondary'
                      className={color.isLight ? "text" : "dark-text text"}
                    >
                      {product[0].trackPrice > 0
                        ? product[0].trackPrice
                        : product[0].collectionPrice ||
                          product[0].collectionPrice}
                      {" " + product[0].currency}
                    </Typography>
                    <IconButton
                      aria-label='previous'
                      className={color.isLight ? "" : "dark-text text"}
                      onClick={() => {
                        basket.saveBasket(product[0]);
                      }}
                    >
                      <AddShoppingCartSharpIcon />
                    </IconButton>
                  </div>

                  <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    className={color.isLight ? "" : "dark-text"}
                  >
                    {product[0].longDescription}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
