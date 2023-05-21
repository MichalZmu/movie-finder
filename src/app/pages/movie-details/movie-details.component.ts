import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { IMovieDetails } from '../../interfaces/search-result';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieId = '';
  movieDetails: IMovieDetails | undefined;
  recentlyViewed: IMovieDetails[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
      this.getMovieDetails(this.movieId);
    });
  }

  getMovieDetails(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (data) => {
        this.movieDetails = data;
        this.loading = false;
        this.updateRecentlyViewed();
      },
    });
  }

  updateRecentlyViewed() {
    const storedRecentlyViewed = localStorage.getItem('recentlyViewed');
    if (storedRecentlyViewed) {
      this.recentlyViewed = JSON.parse(storedRecentlyViewed);
    }

    const index = this.recentlyViewed.findIndex(
      (item: IMovieDetails) => item.imdbID === this.movieId
    );
    if (index !== -1) {
      this.recentlyViewed.splice(index, 1);
    }

    if (this.movieDetails) {
      this.recentlyViewed.unshift(this.movieDetails);
    }
    if (this.recentlyViewed.length > 5) {
      this.recentlyViewed.pop();
    }

    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
  }

  goBackToMainPage(): void {
    this.router.navigateByUrl('/').then();
  }
}
