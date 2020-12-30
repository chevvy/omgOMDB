import { Component, Output, EventEmitter } from '@angular/core';
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
    private searchService: SearchService
  ) { }

  @Output() searchResults = new EventEmitter<Movies>();

  getSearchResults(searchTerm: string): Observable<Movies> {
    return this.searchService.getSearchResultsByTitle(searchTerm);
  }

  emitSearchResults($event): void {
    this.getSearchResults($event.target.value).subscribe(results => {
      if (!results.Search) {
        this.searchResults.emit({ Search: [] });
        return;
      }
      const filteredResults = results.Search.filter(result => result.Type === 'movie');
      this.searchResults.emit({ Search: filteredResults });
    });
  }
}
