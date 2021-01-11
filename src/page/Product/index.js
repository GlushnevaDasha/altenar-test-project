import React, { useState, useContext, useEffect } from "react";
import { ThemeContext, BasketContext } from "../../utils/context";
import { getParameterFromUrl } from "../../utils/functions";
import { getSearchByID } from "../../utils/api";

import { IconButton, Typography } from "@material-ui/core";

import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";

export default function Product() {
  const theme = useContext(ThemeContext);
  const basket = useContext(BasketContext);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getData();
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
    <div
      className={theme.theme ? "white" : "dark"}
      style={{
        padding: "5vh 5vw ",
        height: "100vh"
      }}
    >
      {isFeath ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
              // height: "100vh",
              // padding: "5vh 5vw "
            }}
          >
            <div
              style={{
                backgroundImage: `url(${product[0].artworkUrl100.replace(
                  "100x100bb",
                  "450x450bb"
                )})`,
                width: 450,
                height: 450
              }}
            />
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Typography component='h6' variant='h6' className='text'>
                  {product[0].trackName}
                </Typography>
                <IconButton
                  aria-label='menu'
                  onClick={() => {
                    theme.saveTheme(!theme.theme);
                  }}
                >
                  {theme.theme ? <BrightnessLowIcon /> : <BrightnessHighIcon />}
                </IconButton>
              </div>
              {/* <Typography
                variant='subtitle1'
                color='textSecondary'
                className='text'
              >
                {product[0].artistName}
              </Typography> */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant='subtitle1' color='textSecondary'>
                  {product[0].trackPrice > 0
                    ? product[0].trackPrice
                    : product[0].collectionPrice || product[0].collectionPrice}
                  {" " + product[0].currency}
                </Typography>{" "}
                <IconButton
                  aria-label='previous'
                  onClick={() => {
                    basket.saveBasket(product[0]);
                  }}
                >
                  <AddShoppingCartSharpIcon />
                </IconButton>
              </div>

              <video controls autoplay name='media' style={{ width: 500 }}>
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
            {" "}
            <Typography
              variant='subtitle1'
              color='textSecondary'
              // className='text'
            >
              {product[0].longDescription}
            </Typography>
          </div>
        </div>
      ) : null}
    </div>
  );
}
