import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard(nrows, ncols, chanceLightStartsOn));
  console.log(board)

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(nrows, ncols, chanceLightStartsOn) {
    let initialBoard = [];
    for (let ir = 0; ir < nrows; ir++){
      const row = []
      for (let ic = 0; ic <ncols; ic++){
        const rand = Math.random()
        if (rand < chanceLightStartsOn){
          row.push(true)
        }
        else {
          row.push(false)
        }
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  function hasWon(board) {
    // TODO: check the board in state to determine whether the player has won.
    const check = []
    for (let ir = 0; ir < board.length; ir++){
      if (board[ir].filter((e) => e === true).length === 0){
        check.push(0)
      }
      else {
        check.push(1)
      }
    }
    if (check.filter((e) => e === 1).length === 0){
      return true
    }
    else return false
    }



  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      // TODO: Make a (deep) copy of the oldBoard

      const boardCopy = [...oldBoard]

      const flipCell = (y, x, boardCopy) => {

        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y,x,boardCopy)
      flipCell(y-1, x , boardCopy)
      flipCell(y, x-1, boardCopy)
      flipCell(y, x+1, boardCopy)
      flipCell(y+1, x, boardCopy)

      // TODO: return the copy
      return boardCopy
    });
  }

  

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO

  return (
    <div className="Board">
     <table>
      {board.map(function(row,ir){
      return(<tr>{ row.map((el,ic)=> <Cell key={`${ir}-${ic}`} isLit={el} flipCellsAroundMe={flipCellsAround}></Cell>)

      }</tr>)})}
     </table>
    </div>
  )
}

export default Board;
