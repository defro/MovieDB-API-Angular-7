import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviedbService } from "../../services/moviedb.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {

  movie: any = {};
  actors: any = {};
  loading: boolean;

  constructor(private router: ActivatedRoute, private moviedb: MoviedbService)
  {
    this.loading = true;

    this.router.params.subscribe(params => {
      //console.log(params);
      const id = parseInt(params['id']);

      this.moviedb.getMovie(id).subscribe(movie => {
        console.log(movie);
        this.movie = movie;
      });

      this.moviedb.getMovieCredits(id).subscribe(credit => {
        //console.log(credit);
        this.actors = credit;
        this.loading = false;
      });
})

  }

}
