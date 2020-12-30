import { Component } from '@angular/core';
import { MovieDetails, Movie, Movies } from '../shared/movie.interface';
import { SearchService } from '../search/search.service';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nominations-manager',
  templateUrl: './nominations-manager.component.html',
  styleUrls: ['./nominations-manager.component.scss'],
  animations: [
    trigger('getDetails', [
      state('loaded', style({})),
      state('loading', style({
        height: 0,
      })),
      transition('* => loaded', [
        sequence([
          style({ height: 0}),
          animate('0.2s', style({ }))
        ])
      ])
    ])
  ]
})

export class NominationsManagerComponent {

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar
  ) { }

  searchResults: Movie[];
  nominationsList: Movie[] = [];
  selectedMovie: MovieDetails;
  isDetailCardLoaded = false;

  setSearchResults($event: Movies): void {
    this.searchResults = $event.Search;
  }

  addNominations($event: Movie): void {
    if (this.nominationsList.length >= 5){
      this.snackBar.open('The list is full!', '', {
        duration: 2000
      });
      return;
    }
    if (this.nominationsList.find(x => x === $event)){ return; }
    this.nominationsList.push($event);
  }

  removeNominations($event: Movie): void {
    this.nominationsList = this.nominationsList.filter(movie => movie.Title !== $event.Title);
  }

  setSelectedMovieDetails($event: number): void {
    this.searchService.getMovieByImdbID($event).subscribe(movie => {
      this.isDetailCardLoaded = true;
      this.selectedMovie = movie;
    });
  }
}
