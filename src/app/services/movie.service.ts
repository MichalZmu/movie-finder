import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMovieDetails, ISearchResponse } from '../interfaces/search-result';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://www.omdbapi.com/';
  private apiKey = 'bf5769f2';

  constructor(private http: HttpClient) {}

  searchMovies(
    query: string,
    year: string,
    type: string,
    page: number
  ): Observable<ISearchResponse> {
    const params = {
      s: query,
      y: year,
      type: type,
      page: page.toString(),
      apiKey: this.apiKey,
    };

    return this.http.get<ISearchResponse>(this.apiUrl, { params });
  }

  getMovieDetails(id: string): Observable<IMovieDetails> {
    const params = {
      i: id,
      apiKey: this.apiKey,
    };

    return this.http.get<IMovieDetails>(this.apiUrl, { params });
  }
}
