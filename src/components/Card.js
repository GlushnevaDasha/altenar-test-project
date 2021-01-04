import React from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
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
  const isLight = false;
  return (
    // <Card className='cardContainer'>
    //   <div
    //     style={{
    //       // borderRadius: 15,
    //       // margin: 10,
    //       // boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    //       backgroundImage: `url(${props.object.artworkUrl100.replace(
    //         "100x100bb",
    //         "200x200bb"
    //       )})`
    //     }}
    //   >
    //     <div
    //       style={{
    //         width: 200,
    //         backgroundImage: `linear-gradient(to right, rgba(255,255,255,0), ${
    //           isLight ? "white" : "gray"
    //         })`
    //       }}
    //     />
    //     <div
    //       style={{
    //         padding: 5,
    //         width: 200,
    //         textAlign: "right",
    //         borderTopRightRadius: 15,
    //         borderBottomRightRadius: 15,
    //         backgroundColor: isLight ? "white" : "gray"
    //       }}
    //     >
    //       <p></p>
    //       <p></p>
    //       <p>{props.object.trackPrice || props.object.collectionPrice}</p>
    //     </div>
    //   </div>
    // </Card>

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
          <IconButton aria-label='previous'>
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label='play/pause'>
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label='next'>
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className='cover'
        image={props.object.artworkUrl100.replace("100x100bb", "200x200bb")}
        // title='Live from space album cover'
      />
    </Card>
  );
}
