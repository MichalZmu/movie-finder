import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { MovieService } from '../../services/movie.service';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as movieDetails from '../../../assets/movieDetails.json';

describe('MovieDetailsComponent', () => {
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let movieService: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      providers: [
        { provide: MovieService, useFactory: () => spyOnClass(MovieService) },
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
  });

  beforeEach(() => {
    movieService = TestBed.get(MovieService);
    movieService.getMovieDetails.and.returnValue(of(movieDetails));
    fixture.detectChanges();
  });

  it('should show movie description', () => {
    const movieDetails = fixture.nativeElement.querySelector(
      '[data-test="movie-details"]'
    );

    expect(movieDetails.querySelector('[data-test="year"]').innerText).toEqual(
      'Year: 2016'
    );
    expect(movieDetails.querySelector('[data-test="rated"]').innerText).toEqual(
      'Rated: Not Rated'
    );
    expect(
      movieDetails.querySelector('[data-test="released"]').innerText
    ).toEqual('Released: 22 Jul 2016');
    expect(
      movieDetails.querySelector('[data-test="runtime"]').innerText
    ).toEqual('Runtime: 88 min');
    expect(movieDetails.querySelector('[data-test="genre"]').innerText).toEqual(
      'Genre: Action, Sci-Fi, Thriller'
    );
    expect(
      movieDetails.querySelector('[data-test="director"]').innerText
    ).toEqual('Director: Nicholas Gyeney');
    expect(
      movieDetails.querySelector('[data-test="actors"]').innerText
    ).toEqual('Actors: Manu Bennett, Larenz Tate, Linden Ashby');
    expect(movieDetails.querySelector('[data-test="plot"]').innerText).toEqual(
      "Plot: Champion gamer Max Troy discovers events in a new video game are being mirrored in the real world, and must join forces with the game's protagonist, Orson Creed, to unravel the conspiracy before the game's sinister plot overwhelms..."
    );
  });
});
