export class Board {
  public columns: number;
  private grid: string[][];

  //Gör så att brädet blir 6x7 i mått.
  constructor(private rows: number = 6, columns: number = 7) {
    this.columns = columns;
    this.grid = Array.from({ length: this.rows }, () =>
      Array(this.columns).fill(" ")
    );
  }

  //Detta skapar brädet.
  public display(): void {
    for (let row of this.grid) {
      console.log("|" + row.join("|") + "|");
    }
    console.log(
      " " + Array.from({ length: this.columns }, (_, i) => i + 1).join(" ")
    );
  }

  //Loopar igenom kolumnerna för att lägga symbolen längst ner.
  public placeToken(column: number, symbol: string): boolean {
    for (let row = this.rows - 1; row >= 0; row--) {
      //Kollar ifall det finns en ledig plats i kolumnen.
      if (this.grid[row][column] === " ") {
        this.grid[row][column] = symbol;
        return true;
      }
    }
    return false;
  }

  public canPlaceToken(column: number): boolean {
    return this.grid[0][column] === " ";
  }

  public checkWin(symbol: string): boolean {
    return (
      this.checkHorizontalWin(symbol) ||
      this.checkVerticalWin(symbol) ||
      this.checkDiagonalWinTLBR(symbol) ||
      this.checkDiagonalWinBLTR(symbol)
    );
  }

  //Kollar ifall det ligger 4 av samma symbol horisontellt.
  private checkHorizontalWin(symbol: string): boolean {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col <= this.columns - 4; col++) {
        if (
          this.grid[row][col] === symbol &&
          this.grid[row][col + 1] === symbol &&
          this.grid[row][col + 2] === symbol &&
          this.grid[row][col + 3] === symbol
        ) {
          return true;
        }
      }
    }
    return false;
  }

  //Kollar ifall det ligger 4 av samma symbol vertikalt.
  private checkVerticalWin(symbol: string): boolean {
    for (let col = 0; col < this.columns; col++) {
      for (let row = 0; row <= this.rows - 4; row++) {
        if (
          this.grid[row][col] === symbol &&
          this.grid[row + 1][col] === symbol &&
          this.grid[row + 2][col] === symbol &&
          this.grid[row + 3][col] === symbol
        ) {
          return true;
        }
      }
    }
    return false;
  }

  //Kollar ifall det ligger 4 av samma symbol på diagonalen (från Top Left till Bottom Right).
  private checkDiagonalWinTLBR(symbol: string): boolean {
    for (let row = 0; row <= this.rows - 4; row++) {
      for (let col = 0; col <= this.columns - 4; col++) {
        if (
          this.grid[row][col] === symbol &&
          this.grid[row + 1][col + 1] === symbol &&
          this.grid[row + 2][col + 2] === symbol &&
          this.grid[row + 3][col + 3] === symbol
        ) {
          return true;
        }
      }
    }
    return false;
  }

  //Kollar ifall det ligger 4 av samma symbol på diagonalen (från Bottom Left till Top Right).
  private checkDiagonalWinBLTR(symbol: string): boolean {
    for (let row = 3; row < this.rows; row++) {
      for (let col = 0; col <= this.columns - 4; col++) {
        if (
          this.grid[row][col] === symbol &&
          this.grid[row - 1][col + 1] === symbol &&
          this.grid[row - 2][col + 2] === symbol &&
          this.grid[row - 3][col + 3] === symbol
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
