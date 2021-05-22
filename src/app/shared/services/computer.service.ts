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
    /** TODO - počítač vyberie pole, kam umiestni svoj znak - spraviť mark toggle (zvoliť si kruh, alebo krížik) */
    /** tri krížiky v rade zmenia farbu na zelenú, tri kruhy v rade zmenia farbu na červenú */
    /** color: #008000;		#ff0000 */
    /** možnosť vybrať či chceme hrať na prvé víťazné (po výhre zobrazí alert), alebo na body (*ngIf - section 
	zujúcu počet bodov pre oboch hráčov s ikonou krížiku a kruhu) */
  }

  private getRandomInteger(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getRandomField(row: number, col: number): number {
    let rowIndex = this.getRandomInteger(row);
    let colIndex = this.getRandomInteger(col);
console.log(this.board[rowIndex][colIndex]);			// private 		PRIDAT BUTTON NEW GAME - ERROR, AK RESIZE
    return this.board[rowIndex][colIndex];		// Ak vyberie, zistiť, či je 0, ak je 0 zmeniť na 1 alebo 2, podla 
	// toho, čo má pridelené pocítac - subjekt odoslať informáciu do main, kde pridá 1 / 2 znak tomu polu 
  }
}
