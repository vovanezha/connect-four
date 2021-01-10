import React from "react";
import Board from "./board";
import ModalDialog from "./modal-dialog";
import PlayerContext from "./players-context";

// gets two dioganals "/" and "\" base on the selected disc
const getCurrentDioganals = (board, selectedRow, selectedColumn) => {
  const isNotOutOfRange = (row, column) => board[row] && board[row][column] !== undefined;

  // gets the "\" dioganal
  const backslash = [];

  for (let row = selectedRow - 1, column = selectedColumn - 1; isNotOutOfRange(row, column); row--, column--) {
    backslash.push(board[row][column]);
  }

  backslash.push(board[selectedRow][selectedColumn]);

  for (let row = selectedRow + 1, column = selectedColumn + 1; isNotOutOfRange(row, column); row++, column++) {
    backslash.push(board[row][column]);
  }

  // gets the "/" dioganal
  const slash = [];

  for (let row = selectedRow - 1, column = selectedColumn + 1; isNotOutOfRange(row, column); row--, column++) {
    slash.push(board[row][column]);
  }

  slash.push(board[selectedRow][selectedColumn]);

  for (let row = selectedRow + 1, column = selectedColumn - 1; isNotOutOfRange(row, column); row++, column--) {
    slash.push(board[row][column]);
  }

  return [slash, backslash];
};

const hasFourConnectedDiscs = (discs, target) => {
  let connectedFour = [];

  for (let i = 0; i < discs.length; i++) {
    if (connectedFour.length === 4) {
      break;
    }

    if (discs[i] === target && discs[i] !== null) {
      connectedFour.push(discs[i]);
    } else {
      connectedFour = [];
    }
  }

  return connectedFour.length === 4;
};

function Game({ onUpdate }) {
  const [winner, setWinner] = React.useState(false);
  const currentPlayer = React.useContext(PlayerContext);

  const handleUpdate = (board, selectedRow, selectedColumn) => {
    const selectedDisc = board[selectedRow][selectedColumn];

    const verticalLine = board.map((row) => row[selectedColumn]);
    const hasVerticalWin = hasFourConnectedDiscs(verticalLine, selectedDisc);

    const horizontalLine = board[selectedRow];
    const hasHorizontalWin = hasFourConnectedDiscs(horizontalLine, selectedDisc);

    const dioganals = getCurrentDioganals(board, selectedRow, selectedColumn);
    const hasDioganalsWin = dioganals.some((dioganal) => hasFourConnectedDiscs(dioganal, selectedDisc));

    if (hasHorizontalWin || hasVerticalWin || hasDioganalsWin) {
      setWinner(currentPlayer);
    }

    onUpdate();
  };

  return (
    <>
      <Board onUpdate={handleUpdate} />
      <ModalDialog open={winner}>
        <h1>You won!</h1>
      </ModalDialog>
    </>
  );
}

export default Game;
