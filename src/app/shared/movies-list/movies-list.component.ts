import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Movie } from '../movie.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent {
  @Input() results: Movie[];
  @Input() areMoviesRemovable: boolean;
  @Input() title: string;

  @Output() removeNomination = new EventEmitter<Movie>();
  @Output() addNomination = new EventEmitter<Movie>();
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
