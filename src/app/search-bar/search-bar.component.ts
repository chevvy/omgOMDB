import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import {Result, SearchResults} from '../movie/result';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private searchService: SearchService) { }

  @Output() movieList = new EventEmitter<SearchResults>(); // TODO générer liste de film

  movie: Result;
  searchterm: string;

  ngOnInit(): void {
  }

  // getMovie(): void {
  //   this.searchService.getMovieByTitle(this.searchterm).subscribe(movie => {
  //     this.movieList.emit(movie);
  //   });
  // }

  getMovieList(): void {
    this.searchService.getResultsByTitle(this.searchterm).subscribe(result => {
      this.movieList.emit(result);
    });
  }

  setSearchTerm($event): void{
    this.searchterm = $event.target.value;
  }

}
