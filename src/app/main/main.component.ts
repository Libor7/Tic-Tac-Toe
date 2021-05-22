import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from '../shared/services/helper.service';
import { ComputerService } from '../shared/services/computer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  boardRows: number = 3;
  boardColumns: number = 3;
  maxRows: number = 5;
  maxCols: number = 5;
  marksInRowToWin: number = 3;
  isGameSettingsVisible: boolean = false;
  private isCrossMark: boolean = true;
  currentMark: string = 'close';
  private competingComputer: boolean = false;
  private informationSubjectSubscription!: Subscription;
  @ViewChild('playingArea', {static: true}) PlayingArea!: ElementRef;

  constructor(private elementRef: ElementRef, 
  private helperService: HelperService, 
  private computerService: ComputerService) {}

  ngOnInit(): void {
    this.informationSubjectSubscription = this.helperService.informationSubject
    .subscribe(info => this.receiveInformation(info));
  }

  setRepetition(reps: number): Array<number> {
    return new Array(reps);
  }

  drawGridBoundaries(firstTr: boolean, lastTr: boolean, firstTd: boolean, lastTd: boolean): Object {
    if (firstTr && firstTd) {
      return {
        'border-top-color': '#fff',
        'border-left-color': '#fff'
      };
    } else if (firstTr && lastTd) {
      return {
        'border-top-color': '#fff',
        'border-right-color': '#fff'
      };
    } else if (firstTd && lastTr) {
      return {
        'border-bottom-color': '#fff',
        'border-left-color': '#fff'
      };
    } else if (lastTr && lastTd) {
      return {
        'border-bottom-color': '#fff',
        'border-right-color': '#fff'
      };
    } else if (firstTr) {
      return {
        'border-top-color': '#fff'
      };
    } else if (lastTr) {
      return {
        'border-bottom-color': '#fff'
      };
    } else if (firstTd) {
      return {
        'border-left-color': '#fff'
      };
    } else if (lastTd) {
      return {
        'border-right-color': '#fff'
      };
    } else {
      return {};
    }
  }

  placeMark(event: Event): void {
    let field = <HTMLElement>event.target;
    if (this.competingComputer == true) {
this.computerService.getRandomField(+field.getAttribute('data-row')!, +field.getAttribute('data-col')!);
      if (field.getAttribute('data-clicked') === '1') {
        this.computerService
        .placeMarkInField(+field.getAttribute('data-row')!, +field.getAttribute('data-col')!);
        this.removeMark(field);
      } else {
        this.computerService
        .placeMarkInField(+field.getAttribute('data-row')!, +field.getAttribute('data-col')!, this.currentMark);
        this.addMark(field);
      }
    } else {
      if (field.getAttribute('data-clicked') === '1') {
        this.removeMark(field);
      } else {
        this.addMark(field);
      }
    }
  }

  private addMark(field: HTMLElement): void {
    field.innerText = this.currentMark;
    field.style.color = '#000';
    field.setAttribute('data-clicked', '1');
    this.toggleCurrentMark();
  }

  private removeMark(field: HTMLElement): void {
    field.style.color = '#fff';
    field.setAttribute('data-clicked', '0');
    this.toggleCurrentMark();
  }

  private toggleCurrentMark(): void {
    this.isCrossMark = !this.isCrossMark;
    this.currentMark = this.isCrossMark ? 'close' : 'radio_button_unchecked';
  }

  private receiveInformation(info: string): void {
    switch (info) {
      case 'clear':
        this.clearBoard();
        break;
      case 'settings':
        this.toggleSettings();
        break;
      case 'vsComp':
        this.humanVsComputer();
        break;
      case 'vsHuman':
        this.humanVsHuman();
        break;
    }
  }

  private clearBoard(): void {
    this.isCrossMark = true;
    this.currentMark = 'close';
    this.elementRef.nativeElement.querySelectorAll('td > i.material-icons')
    .forEach((elem: HTMLElement) => this.resetField(elem));
  }

  private resetField(elem: HTMLElement): void {
    elem.style.color = '#fff';
    elem.innerText = this.currentMark;
    elem.setAttribute('data-clicked', '0');
  }

  private toggleSettings(): void {
    this.isGameSettingsVisible = !this.isGameSettingsVisible;
  }

  private humanVsComputer(): void {
    this.computerService.initializeBoard(this.boardRows, this.boardColumns);
    this.competingComputer = true;
  }

  private humanVsHuman(): void {
    this.competingComputer = false;
  }

  setColumns(cols: number): void {
    this.setBoardDimensions();
    this.boardColumns = cols < 3 ? 3 : cols;
  }

  setRows(rows: number): void {
    this.setBoardDimensions();
    this.boardRows = rows < 3 ? 3 : rows;
  }

  private setBoardDimensions(): void {
    let playingAreaHeight = this.PlayingArea.nativeElement.offsetHeight;
    let playingAreaWidth = this.PlayingArea.nativeElement.offsetWidth;
    this.maxRows = Math.floor(playingAreaHeight / 50) - 1;
    this.maxCols = playingAreaWidth < 300 ? Math.floor(playingAreaWidth / 50) : Math.floor(playingAreaWidth / 50) - 1;
// this.computerService.initializeBoard(this.boardRows, this.boardColumns);
  }

  ngOnDestroy(): void {
    this.informationSubjectSubscription.unsubscribe();
  }
}
