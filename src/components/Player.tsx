import React from "react";

import "../utils/styles/components/player.css";

interface IPlayerProps {
  type?: string;
  previewUrl: string;
}

export const Player: React.FC<IPlayerProps> = ({
  type = "feature-movie",
  previewUrl
}) => {
  const isFilm = () => {
    return type === "feature-movie" ? true : false;
  };

  return (
    <video
      controls
      className={isFilm() ? "video-container" : "audio-container"}
    >
      <source
        src={previewUrl}
        type={isFilm() ? "video/x-m4v" : "audio/x-m4a"}
      />
    </video>
  );
};
