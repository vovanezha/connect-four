import React from "react";
import PlayerContext, { COLOR_BY_PLAYER } from "./players-context";
import "./board.css";

const INITIAL_BOARD_SCHEMA = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

function Board({ onUpdate }) {
  const [boardSchema, setBoardSchema] = React.useState(INITIAL_BOARD_SCHEMA);
  const currentPlayer = React.useContext(PlayerContext);

  const handleCellClick = (selectedRow, selectedCell) => () => {
    for (let index = selectedRow; index < boardSchema.length; index++) {
      console.log(index);
      if (boardSchema[index + 1] === undefined || boardSchema[index + 1][selectedCell] !== null) {
        boardSchema[index][selectedCell] = currentPlayer;
        break;
      }
    }

    setBoardSchema(boardSchema);

    onUpdate();
  };

  return (
    <div className="board__container">
      {boardSchema.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="cell">
              <button
                aria-label="empty-cell"
                onClick={handleCellClick(rowIndex, cellIndex)}
                disabled={cell !== null}
                style={{ backgroundColor: COLOR_BY_PLAYER[cell] }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
