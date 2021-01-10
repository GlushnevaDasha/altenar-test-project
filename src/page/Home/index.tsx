import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BasketContext, ThemeContext } from "../../utils/context";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Grid,
  Badge,
  Modal
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingBasket";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import BrightnessLowIcon from "@material-ui/icons/BrightnessLow";

import Card from "../../components/Card";
import { getSearchAll } from "../../utils/api";

import "../../utils/styles/components/loader.css";
import "../../utils/styles/page/home.css";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px"
    }
  })
)(Badge);

export default function Home() {
  const theme = useContext(ThemeContext);
  const basket = useContext(BasketContext);
  const [mas, setMas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // setMas(cookie.load("search").results);
    // const length = basket.basket.length;
    // basketMas !== length
    //   ? setBasketMas(length)
    //   : console.log("basket.basket.length useEffect", basket.basket.length);
  });

  const [isFeath, setFeath] = useState(true);
  const [isModal, setModal] = useState(false);

  async function getData() {
    setFeath(false);
    let data = await getSearchAll(search);
    if (data.error) {
      setMas(mas);
      setFeath(true);
    } else {
      setMas(data.results);
      setFeath(true);
    }
  }

  const showModal = () => {
    setModal(!isModal);
  };

  return (
    <>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        body
      </Modal> */}
      <div className={theme.theme ? "white" : "dark"}>
        {console.log("basket.basket.length", basket)}
        {console.log("theme", theme)}
        <div className='search'>
          <TextField
            id='outlined-search'
            label='Search iTunes Store'
            type='search'
            variant='outlined'
            fullWidth
            value={search}
            onChange={event => {
              setSearch(event.target.value);
            }}
          />
          <Button
            variant='outlined'
            color='primary'
            onClick={() => getData()}
            startIcon={<SearchIcon />}
            style={{ marginLeft: 10 }}
          >
            Поиск
          </Button>

          <Link to='/shop'>
            <IconButton aria-label='cart'>
              <StyledBadge
                badgeContent={basket.basket.length}
                color='secondary'
              >
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>

          <IconButton
            aria-label='menu'
            onClick={() => {
              theme.saveTheme(!theme.theme);
            }}
          >
            {theme.theme ? <BrightnessLowIcon /> : <BrightnessHighIcon />}
          </IconButton>
        </div>
        <div>
          {/* className={mas.length === 0 || !isFeath ? "page" : null}> */}
          {isFeath ? (
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              {mas.length !== 0
                ? mas.map((item, index) => (
                    <Card key={index} object={item} modal={showModal} />
                  ))
                : null}
            </Grid>
          ) : (
            <div className='loaderContainer'>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
