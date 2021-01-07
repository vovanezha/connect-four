import React from "react";
import "./board.css";

const BOARD_SCHEMA = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

function Board() {
  return (
    <div className="board__container">
      {BOARD_SCHEMA.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className="cell">
              <button aria-label="empty-cell" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
