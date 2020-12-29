import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import { SearchResults } from '../movie/result';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  constructor(
    private http: HttpClient,
    private searchService: SearchService
  ) { }

  @Output() searchResults = new EventEmitter<SearchResults>();

  getSearchResults(searchTerm: string): Observable<SearchResults> {
    return this.searchService.getResultsByTitle(searchTerm);
  }

  emitSearchResults($event): void {
    this.getSearchResults($event.target.value).subscribe(result => this.searchResults.emit(result));
  }
}
