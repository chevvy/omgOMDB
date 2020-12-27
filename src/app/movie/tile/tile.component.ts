import {Component, Input, Output, EventEmitter, ViewChild, OnInit} from '@angular/core';
import { Result } from '../result';
import { MatExpansionPanel } from '@angular/material/expansion';
import {animate, sequence, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  animations: [
    trigger('remove', [
      state('active', style({ })),
      state('removed', style({
        height: 0,
      })),
      transition('active => removed', [
        animate('0.2s')
      ]),
    ]),
    trigger('add', [
      state('added', style({
      })),
      state('notadded', style({
        height: 0
      })),
      transition('* => added', [
        sequence([
          style({ height: 0}),
          animate('0.2s', style({ }))
        ])
      ])
    ])
  ]
})

export class TileComponent implements OnInit {
  @Output() addMovie = new EventEmitter<Result>();
  @Output() removeMovie = new EventEmitter<Result>();
  @Output() selectMovie = new EventEmitter<number>();
  @Input() isResultRemovable;

  @ViewChild(MatExpansionPanel) tileExpansionPanel: MatExpansionPanel;

  isTileSelected = false;
  isTileRemoved = false;

  tileAddState: 'added'| 'notadded' = 'notadded';

  constructor() { }
  // TODO un checkup qui vérifie dans le store lorsque changement de liste de nominations
  // TODO si le titre de la tile s'y retrouve, alors on grey-out le bouton ajout (ou retirer?)
  @Input() movie: Result;

  ngOnInit(): void {
    if (this.isResultRemovable) {
      this.tileAddState = 'notadded';
      this.tileAddState = 'added';
    }
  }

  add(): void {
    this.addMovie.emit(this.movie);
    this.tileExpansionPanel.close();
  }

  remove(): void {
    if (this.isTileRemoved){
      this.removeMovie.emit(this.movie);
    }
  }

  getMoreDetails(): void {
    this.selectMovie.emit(this.movie.imdbID);
    this.tileExpansionPanel.close();
  }

  tileClicked(): void {
    this.isTileSelected ? this.isTileSelected = false : this.isTileSelected = true;
  }
}
