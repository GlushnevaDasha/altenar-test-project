import React, { useState, useEffect, useContext } from "react";
import ThemeContext from "../../utils/context/Theme";

import {
  makeStyles,
  Theme,
  createStyles,
  withStyles
} from "@material-ui/core/styles";
import {
  Divider,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Grid,
  Badge
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      margin: "0px 10px"
      // width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      // padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);

export default function Home() {
  const theme = useContext(ThemeContext);

  const [mas, setMas] = useState([]);
  const [search, setSearch] = useState("");

  const [isFeath, setFeath] = useState(true);

  async function getData() {
    setFeath(false);
    console.log("search", search);
    let data = await getSearchAll(search);
    if (data.error) {
      setMas(mas);
      setFeath(true);
    } else {
      console.log("data", data);
      setMas(data.results);
      setFeath(true);
    }
  }

  const classes = useStyles();

  return (
    <div className={theme.theme ? "white" : "dark"}>
      <div className='search'>
        <IconButton className={classes.iconButton} aria-label='menu'>
          <MenuIcon />
        </IconButton>
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
        >
          Поиск
        </Button>
        <IconButton
          aria-label='cart'
          onClick={() => {
            document.location.href = "/shop";
          }}
        >
          <StyledBadge badgeContent={4} color='secondary'>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton
          className={classes.iconButton}
          aria-label='menu'
          onClick={() => {
            theme.saveTheme(!theme.theme);
          }}
        >
          {theme.theme ? <BrightnessLowIcon /> : <BrightnessHighIcon />}
        </IconButton>
      </div>
      <div className={mas.length === 0 || !isFeath ? "page" : null}>
        {isFeath ? (
          <Grid container direction='row' justify='center' alignItems='center'>
            {mas.length !== 0
              ? mas.map((item, index) => <Card key={index} object={item} />)
              : null}
          </Grid>
        ) : (
          <div className='loaderContainer'>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}
