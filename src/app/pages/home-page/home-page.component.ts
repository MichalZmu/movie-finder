import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ISearchResponse } from '../../interfaces/search-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  searchQueryValue = '';
  year = '';
  type = '';
  currentPage = 1;
  totalPages = 0;
  searchResult: ISearchResponse = {
    Response: '',
    Search: [],
    totalResults: '',
  };
  loading = false;

  constructor(private movieService: MovieService, private router: Router) {}

  searchMovies(): void {
    this.loading = true;
    this.movieService
      .searchMovies(
        this.searchQueryValue,
        this.year,
        this.type,
        this.currentPage
      )
      .subscribe({
        next: (data) => {
          this.searchResult = data;
          if (this.searchResult) {
            this.totalPages = Math.ceil(+this.searchResult.totalResults / 10);
          } else {
            this.totalPages = 0;
          }
          this.loading = false;
        },
        error: (e) => {
          console.error(e);
          this.loading = false;
        },
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchMovies();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchMovies();
    }
  }

  onSubmit(): void {
    this.searchMovies();
  }

  goToDetailsView(id: string): void {
    this.router.navigate(['/movie', id]).then();
  }
}
