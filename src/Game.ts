import readlineSync from "readline-sync";
import { Board } from "./Board";
import { Player } from "./Player";
import { validateInput } from "./Utilities";

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

  private chooseGameMode(): void {
    const choice = readlineSync.question(
      "Choose gamemode: 1 for PvP, 2 for PvB: "
    );
    this.isVsBot = choice === "2";
  }

  public start(): void {
    let isGameOver = false;

    while (!isGameOver) {
      this.board.display();
      const currentPlayer = this.players[this.currentPlayerIndex];
      console.log(`${currentPlayer.name}'s turn (${currentPlayer.symbol})`);

      let column: number;

      if (this.isVsBot && currentPlayer.name === "Bot") {
        column = getRandomColumn(this.board);
        console.log(`The bot chooses column ${column + 1}`);
      } else {
        column = this.getPlayerMove();
      }

      const success = this.board.placeToken(column, currentPlayer.symbol);

      if (!success) {
        console.log("Column is full. Try another one.");
        continue;
      }

      if (this.board.checkWin(currentPlayer.symbol)) {
        this.board.display();
        console.log(`${currentPlayer.name} Wins!`);
        isGameOver = true;
      } else if (this.board.isFull()) {
        this.board.display();
        console.log("It's a draw!");
        isGameOver = true;
      } else {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
      }
    }
  }
}
