import React from "react";

export const PLAYER = {
  FIRST: "player 1",
  SECOND: "player 2",
};

export const COLOR_BY_PLAYER = {
  [PLAYER.FIRST]: "#ffcf05",
  [PLAYER.SECOND]: "#f25454",
};

const PlayerContext = React.createContext(PLAYER.FIRST);

export default PlayerContext;
