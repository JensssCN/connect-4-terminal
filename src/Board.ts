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
}
