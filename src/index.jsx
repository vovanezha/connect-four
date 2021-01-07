import React from "react";
import ReactDOM from "react-dom";
import Board from "./board";
import "./global.css";

const App = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
