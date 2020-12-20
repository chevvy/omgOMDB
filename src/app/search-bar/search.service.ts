import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../movie/result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ){ }

  private apiUrl = 'http://omdbapi.com/';
  private apiKeyToAppend = '&apikey=b76b4218';

  getMoviesByTitle(title: string): Observable<Result> {
    const apiReq = this.apiUrl + '?t=' + title + this.apiKeyToAppend;
    return this.http.get<Result>(apiReq);
  }
}
