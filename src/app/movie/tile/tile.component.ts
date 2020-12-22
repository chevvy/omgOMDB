import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Result, MovieResult} from '../result';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent  {
  @Output() addMovie = new EventEmitter<Result>();
  @Output() removeMovie = new EventEmitter<Result>();
  @Output() selectMovie = new EventEmitter<number>();
  @Input() isResultRemovable;

  constructor() { }
  // TODO un checkup qui vérifie dans le store lorsque changement de liste de nominations
  // TODO si le titre de la tile s'y retrouve, alors on grey-out le bouton ajout (ou retirer?)
  @Input() movie: Result;

  add(): void {
    this.addMovie.emit(this.movie);
  }

  remove(): void {
    this.removeMovie.emit(this.movie);
  }

  select(): void {
    this.selectMovie.emit(this.movie.imdbID);
  }
}
