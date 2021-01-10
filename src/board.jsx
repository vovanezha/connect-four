import React from "react";
import PlayerContext, { COLOR_BY_PLAYER } from "./players-context";
import useMousePosition from "./useMousePosition";
import "./board.css";

const INITIAL_BOARD_SCHEMA = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

const COLUMNS = INITIAL_BOARD_SCHEMA[0];

const isDisc = (cell) => cell !== null;
const isInOutside = (cell) => cell === undefined;
const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
const isColumnFilled = (board, column) => isDisc(board[0][column]);

const getSliderButtonPosition = (mousePosition) => {
  const [limitMin, limitMax] = [50, 650];

  const cellSize = 100;
  let position = mousePosition;

  if (mousePosition < limitMin || mousePosition === null) {
    position = limitMin;
  }
  if (mousePosition > limitMax) {
    position = limitMax;
  }

  const nearestToCellCenterNumber = findNearestToCellCenterNumber(mousePosition);
  if (Math.abs(nearestToCellCenterNumber - mousePosition) < 25) {
    position = nearestToCellCenterNumber;
  }

  return position - cellSize / 2;
};

const findNearestToCellCenterNumber = (number) => {
  const condition = (n) => n % 50 === 0 && n % 100 !== 0;
  let a = number;
  let b = number;
  let notFound = true;

  while (notFound) {
    if (condition(++a)) {
      return a;
    }
    if (condition(--b)) {
      return b;
    }
  }
};

function Board({ onUpdate }) {
  const [board, setBoardSchema] = React.useState(INITIAL_BOARD_SCHEMA);
  const currentPlayer = React.useContext(PlayerContext);

  const { mousePosition, updateMousePosition } = useMousePosition();

  const handleSliderButtonClick = () => {
    const index = Math.floor(mousePosition.x / 100);
    rollDownDisc(index);
  };

  const rollDownDisc = (selectedColumn) => {
    let selectedRow;
    let updatedRow;

    for (let index = 0; index < board.length; index++) {
      const nextCell = board[index + 1]?.[selectedColumn];

      if (isInOutside(nextCell) || isDisc(nextCell)) {
        selectedRow = index;
        updatedRow = insert(board[index], selectedColumn, currentPlayer);
        break;
      }
    }

    const updatedBoard = insert(board, selectedRow, updatedRow);

    setBoardSchema(updatedBoard);

    onUpdate(updatedBoard, selectedRow, selectedColumn);
  };

  return (
    <div>
      <div className="columns__container" onMouseMove={updateMousePosition} onClick={handleSliderButtonClick}>
        {COLUMNS.map((_, index) => (
          <div key={index} className="cell">
            {/* <span
              className="disc"
              aria-label={`column ${index + 1}`}
              onClick={handleSelectColumn(index)}
              disabled={isColumnFilled(board, index)}
              onMouseMove={(e) => e.stopPropagation()}
            /> */}
          </div>
        ))}
        <div className="cell slider-button" style={{ left: getSliderButtonPosition(mousePosition.x) }}>
          <button
            className="disc"
            aria-label="slider button"
            style={{ backgroundColor: COLOR_BY_PLAYER[currentPlayer] }}
          />
        </div>
      </div>
      <div className="board__container">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="cell">
                <span
                  aria-label="empty-cell"
                  className="disc"
                  disabled={cell !== null}
                  style={{ backgroundColor: COLOR_BY_PLAYER[cell] }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
