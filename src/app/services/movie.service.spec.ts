import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import * as movieDetails from '../../assets/movieDetails.json';

describe('MovieService', () => {
  let movieService: MovieService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
  });

  beforeEach(() => {
    movieService = TestBed.get(MovieService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should return expected movie description', (done: DoneFn) => {
    spyOn(httpClient, 'get').and.returnValue(of(movieDetails));

    movieService.getMovieDetails(movieDetails.imdbID).subscribe({
      next: (heroes) => {
        expect(heroes).withContext('expected heroes').toEqual(movieDetails);
        done();
      },
      error: done.fail,
    });
  });
});
