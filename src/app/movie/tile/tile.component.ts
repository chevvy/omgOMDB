import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Result } from '../result';
import { MatExpansionPanel } from '@angular/material/expansion';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';

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
  @Output() nominateMovie = new EventEmitter<Result>();
  @Output() removeMovie = new EventEmitter<Result>();
  @Output() getMovieDetails = new EventEmitter<number>();

  @Input() isResultRemovable;
  @Input() movie: Result;

  @ViewChild(MatExpansionPanel) tileExpansionPanel: MatExpansionPanel;

  isTileExpanded = false;
  isTileRemoved = false;
  tileAddState: 'added'| 'notadded' = 'notadded';

  constructor() { }

  ngOnInit(): void {
    if (this.isResultRemovable) {
      this.tileAddState = 'added';
    }
  }

  nominateClicked(): void {
    this.nominateMovie.emit(this.movie);
    this.tileExpansionPanel.close();
  }

  removeClicked(): void {
    // TODO fix weird call by anim system
    if (this.isTileRemoved){ // Protects against weird call by the anim system on init
      this.removeMovie.emit(this.movie);
    }
  }

  getMoreDetailsClicked(): void {
    this.getMovieDetails.emit(this.movie.imdbID);
    this.tileExpansionPanel.close();
  }

  tileClicked(): void {
    this.isTileExpanded ? this.isTileExpanded = false : this.isTileExpanded = true;
  }
}
