import React from "react";
import ReactDOM from "react-dom";
import Game from "./game";
import "./global.css";
import PlayerContext, { PLAYER } from "./players-context";

const App = () => {
  const [player, setPlayer] = React.useState(PLAYER.FIRST);

  const hanldeUpdate = () => {
    setPlayer(player === PLAYER.FIRST ? PLAYER.SECOND : PLAYER.FIRST);
  };

  return (
    <PlayerContext.Provider value={player}>
      <main>
        <Game onUpdate={hanldeUpdate} />
      </main>
    </PlayerContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
