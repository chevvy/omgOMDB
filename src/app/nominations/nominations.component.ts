import { Component, OnInit } from '@angular/core';
import {MovieResult, Result} from '../movie/result';
import {SearchService} from '../search-bar/search.service';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.scss']
})
export class NominationsComponent implements OnInit {

  constructor(
    private searchService: SearchService
  ) { }
  searchResults: Result[];
  nominationsList: Result[];
  selectedMovie: MovieResult;

  ngOnInit(): void {
    this.nominationsList = [{Title: 'allo', Year: 'mon coco', imdbID: 1234, Poster: 'http://hello.com'}];
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
    this.searchService.getMovieByImdbID($event).subscribe(movie => this.selectedMovie = movie);
    console.log(this.selectedMovie);
  }
}
