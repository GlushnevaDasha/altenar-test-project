import React, { useState, useContext, useEffect } from "react";
import { ThemeContext, BasketContext } from "../../utils/context";
import { getParameterFromUrl } from "../../utils/functions";
import { getSearchByID } from "../../utils/api";
import { getColorInfo } from "../../utils/functions";

import { IconButton, Typography } from "@material-ui/core";

import { AddShoppingCartSharp } from "../../asets/icons";
import { ThemeButton, AddShoppingCart } from "../../components/IconButtons";

import "../../utils/styles/page/product.css";

export default function Product() {
  const theme = useContext(ThemeContext);
  const basket = useContext(BasketContext);
  const [product, setProduct] = useState<any>([]);
  const [color, setColor] = useState<any>({});
  useEffect(() => {
    getData();
  }, [product.length]);

  const [isFeath, setFeath] = useState(false);

  async function getData() {
    setFeath(false);
    const id = getParameterFromUrl("id").toString();
    let data = await getSearchByID(id);
    setProduct(data);
    const colorInfo: any = await getColorInfo(data.imgUrl);
    setColor(colorInfo);
    setFeath(true);
  }

  const isFilm = () => {
    return product.type === "feature-movie" ? true : false;
  };

  return (
    <div className={theme.theme ? "white" : "dark"}>
      <div className={"full-page"}>
        {isFeath ? (
          <div className='page'>
            <div className='center'>
              <div
                className={isFilm() ? "poster-video" : "poster-sound"}
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
                  <ThemeButton />
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
                  <AddShoppingCart product={product} />
                </div>
                <video controls className='video-container'>
                  <source
                    src={`${product.previewUrl}`}
                    type={isFilm() ? "video/x-m4v" : "audio/x-m4a"}
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
                className={isFilm() ? "poster-video" : "poster-sound"}
                style={{
                  backgroundImage: `url(${product.imgUrl.replace(
                    "100x100bb",
                    "450x450bb"
                  )})`
                }}
              >
                <div
                  className='mobile-content-container'
                  style={{
                    paddingTop: isFilm() ? "70vw" : "60vw",
                    paddingBottom: isFilm() ? "0vw" : "35vw",
                    background: `linear-gradient(rgba(0, 0, 0, 0) 25% ,${color.hex} 50%, ${color.hex} 100% )`
                  }}
                >
                  <video
                    controls
                    className={isFilm() ? "video-container" : "audio-container"}
                  >
                    <source
                      src={`${product.previewUrl}`}
                      type={isFilm() ? "video/x-m4v" : "audio/x-m4a"}
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
                      <AddShoppingCartSharp />
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
  );
}
