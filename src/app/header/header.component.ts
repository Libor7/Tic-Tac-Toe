import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { HelperService } from '../shared/services/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef, private helperService: HelperService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.querySelectorAll('.btn-game')
    .forEach((elem: HTMLButtonElement) => elem.addEventListener('click', this.gameStart.bind(this)));
    this.elementRef.nativeElement.querySelector('#game-settings')
	.addEventListener('click', this.displayGameSettings.bind(this));
  }

  private gameStart() {
    this.helperService.informationSubject.next('clear');
	if ((<HTMLButtonElement>event?.target).id == 'single-player') {
      this.playAgainstComputer();
    } else {
      this.playAgainstHuman();
    }
  }

  private displayGameSettings() {
    this.helperService.informationSubject.next('settings');
  }

  private playAgainstComputer() {
    this.helperService.informationSubject.next('vsComp');
  }

  private playAgainstHuman() {
    this.helperService.informationSubject.next('vsHuman');
  }
}
