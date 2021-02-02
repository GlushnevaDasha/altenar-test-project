import React, { useState, useContext, useEffect } from "react";
import FastAverageColor from "fast-average-color";
import { ThemeContext, BasketContext } from "../../utils/context";
import { getParameterFromUrl } from "../../utils/functions";
import { getSearchByID } from "../../utils/api";

import { IconButton, Typography, CircularProgress } from "@material-ui/core";

import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";
import { ProductItem } from "../../utils/models/product";
import "../../utils/styles/page/product.css";

export default function Product() {
  const theme = useContext(ThemeContext);
  const basket = useContext(BasketContext);
  let [product, setProduct] = useState<any>(null);
  const [color, setColor] = useState({});
  useEffect(() => {
    getData();
  }, [product]);

  const [isFeath, setFeath] = useState(false);

  async function getData() {
    setFeath(false);
    const id: string = getParameterFromUrl("id").toString();
    let data = await getSearchByID(id);
    if (data.error) {
      setProduct(product);
      const fac = new FastAverageColor();
      fac
        .getColorAsync(data.imgUrl)
        .then(colors => {
          setColor(colors);
        })
        .catch(e => {
          console.log(e);
        });
      setFeath(true);
    } else {
      setProduct(data.results);
      setFeath(true);
    }
  }

  return (
    <div>
      {product !== null ? (
        <div>
          <div className={theme.theme ? "white full-page" : "dark full-page"}>
            {isFeath ? (
              <div className='page'>
                <div className='center'>
                  <div
                    className={
                      product.type === "feature-movie"
                        ? "poster-video"
                        : "poster-sound"
                    }
                    style={{
                      backgroundImage: `url(${product.imgUrl.replace(
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
                        {product.name}
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
                      {product.autor}
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant='subtitle1'
                        color='textSecondary'
                        className={theme.theme ? "" : "dark-text"}
                      >
                        {product.price + " " + product.currency}
                      </Typography>
                      <IconButton
                        aria-label='previous'
                        className={theme.theme ? "" : "dark-text"}
                        onClick={() => {
                          basket.saveBasket(product);
                        }}
                      >
                        <AddShoppingCartSharpIcon />
                      </IconButton>
                    </div>

                    <video controls className='video-container'>
                      <source
                        src={`${product.previewUrl}`}
                        type={
                          product.type === "feature-movie"
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
                    {product.description}
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
                      product.type === "feature-movie"
                        ? "poster-video"
                        : "poster-sound"
                    }
                    style={{
                      backgroundImage: `url(${product.imgUrl.replace(
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
                          product.type === "feature-movie" ? "70vw" : "60vw",
                        paddingBottom:
                          product.type === "feature-movie" ? "0vw" : "35vw",
                        paddingLeft: 10,
                        paddingRight: 10,
                        background: `linear-gradient(rgba(0, 0, 0, 0) 25% ,${color.rgba} 50%, ${color.rgba} 100% )`
                      }}
                    >
                      <video
                        controls
                        name='media'
                        className={
                          product.type === "feature-movie"
                            ? "video-container"
                            : "audio-container"
                        }
                      >
                        <source
                          src={`${product[0].previewUrl}`}
                          type={
                            product.type === "feature-movie"
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
                          {product.name}
                        </Typography>
                      </div>
                      <Typography
                        variant='subtitle1'
                        color='textSecondary'
                        className={color.isLight ? "text" : "dark-text text"}
                      >
                        {product.autor}
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
                          {product.price + " " + product.currency}
                        </Typography>
                        <IconButton
                          aria-label='previous'
                          className={color.isLight ? "" : "dark-text text"}
                          onClick={() => {
                            basket.saveBasket(product);
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
                        {product.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className='loaderContainer'>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
