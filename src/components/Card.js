import React from "react";

export default function Card(props) {
  return (
    <div
      className='cardContainer'
      style={{
        display: "flex",
        alignContent: "center"
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          backgroundImage: `url(${props.object.artworkUrl100.replace(
            "100x100bb",
            "500x500bb"
          )})`
        }}
      ></div>
      <div
        style={{
          right: 0,
          width: 400,
          zIndex: 1,

          background: `linear-gradient(to right,rgba(255,255,255,0),gray)`
        }}
      >
        {props.object.artistName}
      </div>
    </div>
  );
}
