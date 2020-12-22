import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResult, SearchResults } from '../movie/result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ){ }

  private apiUrl = 'https://omdbapi.com/?apikey=b76b4218';

  getMovieByImdbID(imdbID: number): Observable<MovieResult> {
    const apiReq = this.apiUrl + '&i=' + imdbID;
    return this.http.get<MovieResult>(apiReq);
  }

  getResultsByTitle(title: string): Observable<SearchResults> {
    const apiReq = this.apiUrl + '&s=' + title;
    return this.http.get<SearchResults>(apiReq);
  }
}
