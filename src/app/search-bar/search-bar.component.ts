import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import {Result, SearchResults} from '../movie/result';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  constructor(
    private http: HttpClient,
    private searchService: SearchService) { }

  @Output() movieList = new EventEmitter<SearchResults>(); // TODO générer liste de film

  movie: Result;
  searchterm: string;

  getMovieList(): void {
    this.searchService.getResultsByTitle(this.searchterm).subscribe(result => {
      this.movieList.emit(result);
    });
  }

  setSearchTerm($event): void{
    this.searchterm = $event.target.value;
  }

  setSearchTermAndGetMovieList($event): void {
    this.setSearchTerm($event);
    this.getMovieList();
  }
}
