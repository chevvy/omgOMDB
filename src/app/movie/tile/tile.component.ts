import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Result } from '../result';
import { MatExpansionPanel } from '@angular/material/expansion';

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

  @ViewChild(MatExpansionPanel) tileExpansionPanel: MatExpansionPanel;

  isTileSelected = false;

  constructor() { }
  // TODO un checkup qui vérifie dans le store lorsque changement de liste de nominations
  // TODO si le titre de la tile s'y retrouve, alors on grey-out le bouton ajout (ou retirer?)
  @Input() movie: Result;

  add(): void {
    this.addMovie.emit(this.movie);
    this.tileExpansionPanel.close();
  }

  remove(): void {
    this.removeMovie.emit(this.movie);
  }

  getMoreDetails(): void {
    this.selectMovie.emit(this.movie.imdbID);
    this.tileExpansionPanel.close();
  }

  tileClicked(): void {
    this.isTileSelected ? this.isTileSelected = false : this.isTileSelected = true;
  }
}
