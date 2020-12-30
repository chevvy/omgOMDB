import { Component } from '@angular/core';
import {MovieDetails, Movie, Movies} from '../shared/movie.interface';
import { SearchService } from '../search/search.service';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';

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
    private searchService: SearchService
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
      // TODO implement visual feedback
      console.log('The list is full!');
      return;
    }
    if (this.nominationsList.find(x => x === $event)){
      // TODO implement visual feedback
      console.log('this shared is already in the nomination list!');
      return;
    }
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
