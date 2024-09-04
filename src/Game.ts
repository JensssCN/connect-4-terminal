import { Board } from "./Board";
import { Player } from "./Player";

function getRandomColumn(board: Board): number {
  let column: number;
  do {
    column = Math.floor(Math.random() * board.columns);
  } while (!board.canPlaceToken(column));
  return column;
}

export class Game {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number = 0;
  private isVsBot: boolean = false;

  constructor() {
    this.board = new Board();
    this.chooseGameMode();
    this.players = [
      new Player("Player 1", "X"),
      this.isVsBot ? new Player("Bot", "O") : new Player("Player 2", "O"),
    ];
  }
}
