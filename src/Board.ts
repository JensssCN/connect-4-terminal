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
}
