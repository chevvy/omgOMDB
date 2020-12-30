import { TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { SearchService } from '../search.service';
import { SearchMockService } from '../search-mock.service';
import {of} from 'rxjs';
import {Movies} from '../../shared/movie.interface';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      providers: [
        SearchBarComponent,
        { provide: SearchService, useClass: SearchMockService}
      ]
    })
    .compileComponents();
  });

  let mockMovies: Movies;

  beforeEach(() => {
    component = TestBed.inject(SearchBarComponent);
    searchService = TestBed.inject(SearchService);

    mockMovies = {
      Search: [
        { Title: 'test', Year: '1991', imdbID: 123, Poster: 'url1', Type: 'movie' },
        { Title: 'test2', Year: '1980', imdbID: 124, Poster: 'url2', Type: 'movie'}
      ]
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getSearchResults', () => {
    it('returns the observable from searchService', () => {
      spyOn(searchService, 'getSearchResultsByTitle').and.returnValue(of (mockMovies));

      component.getSearchResults('test').subscribe(movies => {
        expect(movies).toEqual(mockMovies);
      });
    });
  });

  describe('emitSearchResults', () => {
    const $event = { target: { value: 'test' }};
    beforeEach(() => {
      spyOn(component, 'getSearchResults').and.returnValue(of(mockMovies));
      spyOn(component.searchResults, 'emit');
    });

    it('it calls getSearchResults with the value of $event', () => {
      component.emitSearchResults($event);

      expect(component.getSearchResults).toHaveBeenCalledWith('test');
    });

    it('it emits the search results from getSearchResults', () => {
      component.emitSearchResults($event);

      expect(component.searchResults.emit).toHaveBeenCalledWith(mockMovies);
    });

    it('filters out non-movie elements', () => {
      const mockMoviesInvalid = {
        Search: [
          { Title: 'test', Year: '1991', imdbID: 123, Poster: 'url1', Type: 'movie' },
          { Title: 'test2', Year: '1980', imdbID: 124, Poster: 'url2', Type: 'game'}
        ]
      };
      const filteredMovies = {
        Search: [
          { Title: 'test', Year: '1991', imdbID: 123, Poster: 'url1', Type: 'movie' },
        ]
      };
      spyOn(component, 'getSearchResults').and.returnValue(of(mockMoviesInvalid));

      component.emitSearchResults($event);

      expect(component.searchResults.emit).toHaveBeenCalledWith(filteredMovies);
    });
  });
});
