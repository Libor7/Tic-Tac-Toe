import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  /** Board: 0 = empty field, 1 = cross, 2 = circle */
  board!: Array<Array<number>>;

  constructor() {}

  initializeBoard(rows: number, cols: number): void {
    this.board = new Array(rows).fill(0).map(() => new Array(cols).fill(0));
  }

  placeMarkInField(row: number, col: number, mark: string = 'remove'): void {
    if (mark == 'close') {
      this.board[row][col] = 1;
    } else if (mark == 'radio_button_unchecked') {
      this.board[row][col] = 2;
    } else {
      this.board[row][col] = 0;
    }
  }

  computerMove(): void {
    /** TODO */
  }

  private getRandomInteger(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getRandomField(row: number, col: number): number {			// pridať private access modifier 
    let rowIndex = this.getRandomInteger(row);
    let colIndex = this.getRandomInteger(col);
console.log(this.board[rowIndex][colIndex]);
    return this.board[rowIndex][colIndex];
  }
}
