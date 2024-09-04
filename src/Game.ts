import { Board } from "./Board";

function getRandomColumn(board: Board): number {
  let column: number;
  do {
    column = Math.floor(Math.random() * board.columns);
  } while (!board.canPlaceToken(column));
  return column;
}

export class Game {
  private board: Board;
}
