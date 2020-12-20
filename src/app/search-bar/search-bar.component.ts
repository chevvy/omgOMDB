import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import { Result } from '../movie/result';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private searchService: SearchService) { }

  @Output() movieList = new EventEmitter<Result>(); // TODO générer liste de film

  movie: Result;
  searchterm: string;

  ngOnInit(): void {
  }

  getMovie(): void {
    this.searchService.getMoviesByTitle(this.searchterm).subscribe(movie => {
      this.movieList.emit(movie);
    });
  }

  setSearchTerm($event): void{
    this.searchterm = $event.target.value;
  }

}
