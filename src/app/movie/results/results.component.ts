import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Result } from '../result';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent{
  @Input() results: Result[];
  @Input() areResultsRemovable: boolean;
  @Input() title: string;

  @Output() removeNomination = new EventEmitter<Result>();
  @Output() addNomination = new EventEmitter<Result>();
  @Output() getMovieDetails = new EventEmitter<number>();

  constructor() { }

  emitRemove($event): void {
    this.removeNomination.emit($event);
  }

  emitNominate($event): void {
    this.addNomination.emit($event);
  }

  emitGetMovieDetails($event): void {
    this.getMovieDetails.emit($event);
  }
}
