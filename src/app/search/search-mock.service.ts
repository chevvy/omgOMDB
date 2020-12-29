import {Observable, of} from 'rxjs';
import {MovieDetails, Movies} from '../shared/movie.interface';

export class SearchMockService {
  apiUrl = 'test';

  getMovieByImdbID(imdbID: number): Observable<MovieDetails> {
    return of({} as MovieDetails);
  }

  getSearchResultsByTitle(title: string): Observable<Movies> {
    return of({} as Movies);
  }
}
