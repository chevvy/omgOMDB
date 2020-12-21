import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Result, SearchResults} from '../movie/result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ){ }

  private apiUrl = 'http://omdbapi.com/?apikey=b76b4218';

  getMovieByTitle(title: string): Observable<Result> {
    const apiReq = this.apiUrl + '?t=' + title;
    return this.http.get<Result>(apiReq);
  }

  getResultsByTitle(title: string): Observable<SearchResults> {
    const apiReq = this.apiUrl + '&s=' + title;
    return this.http.get<SearchResults>(apiReq);
  }
}
