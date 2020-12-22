import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Result } from '../result';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent{
  @Input() results: Result[];
  @Input() isResultRemovable: boolean;
  @Input() title: string;

  @Output() removeNomination = new EventEmitter<Result>();
  @Output() addNomination = new EventEmitter<Result>();
  @Output() selectMovie = new EventEmitter<number>();

  constructor() { }

  remove($event): void {
    this.removeNomination.emit($event);
  }

  add($event): void {
    this.addNomination.emit($event);
  }

  select($event): void {
    this.selectMovie.emit($event);
  }

}
