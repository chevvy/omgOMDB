import {Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Movie } from '../movie.interface';
import { MatExpansionPanel } from '@angular/material/expansion';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
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

export class MovieComponent implements OnInit {
  @Output() nominateMovie = new EventEmitter<Movie>();
  @Output() removeMovie = new EventEmitter<Movie>();
  @Output() getMovieDetails = new EventEmitter<number>();

  @Input() isMovieRemovable;
  @Input() isMovieResultRemovable;
  @Input() canMovieBeNominated;
  @Input() movie: Movie;

  @ViewChild(MatExpansionPanel) tileExpansionPanel: MatExpansionPanel;

  isTileExpanded = false;
  isTileRemoved = false;
  tileAddState: 'added'| 'notadded' = 'notadded';

  constructor() { }

  ngOnInit(): void {
    if (this.isMovieRemovable) {
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
