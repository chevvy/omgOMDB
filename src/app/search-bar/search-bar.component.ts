import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchService} from './search.service';
import { Result } from './result';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private searchService: SearchService) { }

  results: Result;

  ngOnInit(): void {
  }

  getMessage($event): void {
    this.searchService.getMoviesByTitle($event.target.value).subscribe(list => {
      this.results = list;
    });
  }

}
