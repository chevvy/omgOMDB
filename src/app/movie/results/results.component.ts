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

  constructor() { }

  remove($event): void {
    this.removeNomination.emit($event);
  }

  add($event): void {
    this.addNomination.emit($event);
  }

}
