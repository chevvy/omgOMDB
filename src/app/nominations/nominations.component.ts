import { Component, OnInit } from '@angular/core';
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

export class NominationsComponent implements OnInit {

  constructor(
    private searchService: SearchService
  ) { }

  searchResults: Result[];
  nominationsList: Result[];
  selectedMovie: MovieResult;
  areDetailsLoaded = false;

  ngOnInit(): void {
    this.nominationsList = [];
  }

  setSearchResults($event): void {
    if (!this.searchResults){
      this.searchResults = [];
    }
    this.searchResults = $event.Search;
  }

  addNominations($event): void {
    if (this.nominationsList.length >= 5){
      console.log('La liste est pleine!');
      return;
    }
    if (this.nominationsList.find(x => x === $event)){
      console.log('le film est déjà dans la liste');
      return;
    }
    this.nominationsList.push($event);
  }

  removeNominations($event): void {
    this.nominationsList = this.nominationsList.filter(movie => movie.Title !== $event.Title);
  }

  selectMovie($event: number): void {

    this.searchService.getMovieByImdbID($event).subscribe(movie => {
      this.areDetailsLoaded = true;
      this.selectedMovie = movie;
    });
  }
}
