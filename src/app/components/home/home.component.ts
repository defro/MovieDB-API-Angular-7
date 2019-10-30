import { Component, OnInit } from '@angular/core';
import { MoviedbService } from '../../services/moviedb.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  newMovies: any[] = [];
  loading: boolean;

  constructor(private moviedb: MoviedbService, private router: Router) {

    this.loading = true;

    this.moviedb.getLatestMovies()
      .subscribe((data: any) => {
        //console.log(data);
        this.newMovies = data.slice(0, 10);
        this.loading = false;
      });

  }

  detail(movie: any) {
    this.router.navigate(["/movie", movie.id]);
  }

}
