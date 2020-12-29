import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieDetails, Movies } from '../shared/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ){ }

  private apiUrl = 'https://omdbapi.com/?apikey=b76b4218';

  getMovieByImdbID(imdbID: number): Observable<MovieDetails> {
    const apiReq = this.apiUrl + '&i=' + imdbID;
    return this.http.get<MovieDetails>(apiReq);
  }

  getResultsByTitle(title: string): Observable<Movies> {
    const apiReq = this.apiUrl + '&s=' + title;
    return this.http.get<Movies>(apiReq);
  }
}
