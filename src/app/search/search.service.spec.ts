import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieDetails, Movies } from '../shared/movie.interface';

describe('SearchService', () => {
  let service: SearchService;
  let httpTestingController: HttpTestingController;

  const apiUrl = 'https://omdbapi.com/?apikey=b76b4218';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SearchService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovieByImdbID', () => {
    it('should send a correctly formed request', () => {
      service.getMovieByImdbID(123).subscribe(x => x);

      const req = httpTestingController.expectOne('https://omdbapi.com/?apikey=b76b4218&i=123');
      expect(req.request.method).toEqual('GET');
    });

    it('should return an observable with movie details', () => {
      const mockMovieDetails: MovieDetails = {
        Title: 'test',
        Year: '1991',
        imdbID: 123,
        Poster: 'url',
        Metascore: 69,
        Plot: 'adventureeee'
      };

      service.getMovieByImdbID(123).subscribe(details => {
        expect(details).toEqual(mockMovieDetails);
      });

      const req = httpTestingController.expectOne('https://omdbapi.com/?apikey=b76b4218&i=123');
      req.flush(mockMovieDetails);
    });
  });

  describe('getSearchResultsByTitle', () => {
    it('should send a correctly formed request', () => {
      service.getSearchResultsByTitle('test').subscribe(x => x);

      const req = httpTestingController.expectOne('https://omdbapi.com/?apikey=b76b4218&s=test');
      expect(req.request.method).toEqual('GET');
    });

    it('should return an observable with Movies', () => {
      const mockMovie: Movies = {
        Search: [
          { Title: 'test', Year: '1991', imdbID: 123, Poster: 'url1' },
          { Title: 'test2', Year: '1980', imdbID: 124, Poster: 'url2' }
        ]
      };

      service.getSearchResultsByTitle('test').subscribe(movie => {
        expect(movie).toEqual(mockMovie);
      });

      const req = httpTestingController.expectOne('https://omdbapi.com/?apikey=b76b4218&s=test');
      req.flush(mockMovie);
    });
  });
});
