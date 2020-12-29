import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from '../search.service';
import { Movies } from '../../shared/movie.interface';
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

  @Output() searchResults = new EventEmitter<Movies>();

  getSearchResults(searchTerm: string): Observable<Movies> {
    return this.searchService.getSearchResultsByTitle(searchTerm);
  }

  emitSearchResults($event): void {
    this.getSearchResults($event.target.value).subscribe(result => this.searchResults.emit(result));
  }
}
