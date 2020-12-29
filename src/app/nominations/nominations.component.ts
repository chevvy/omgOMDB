import { Component } from '@angular/core';
import { MovieResult, Result } from '../movie/result';
import { SearchService } from '../search-bar/search.service';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.scss'],
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

export class NominationsComponent {

  constructor(
    private searchService: SearchService
  ) { }

  searchResults: Result[];
  nominationsList: Result[] = [];
  selectedMovie: MovieResult;
  isDetailCardLoaded = false;

  setSearchResults($event): void {
    this.searchResults = $event.Search;
  }

  addNominations($event): void {
    if (this.nominationsList.length >= 5){
      console.log('The list is full!');
      return;
    }
    if (this.nominationsList.find(x => x === $event)){
      console.log('this movie is already in the nomination list');
      return;
    }
    this.nominationsList.push($event);
  }

  removeNominations($event): void {
    this.nominationsList = this.nominationsList.filter(movie => movie.Title !== $event.Title);
  }

  getSelectedMovieDetails($event: number): void {
    this.searchService.getMovieByImdbID($event).subscribe(movie => {
      this.isDetailCardLoaded = true;
      this.selectedMovie = movie;
    });
  }
}
