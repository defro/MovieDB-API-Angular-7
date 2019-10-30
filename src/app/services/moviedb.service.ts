import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MoviedbService {

  private apikey: string = "c89646cb9c2f9f7a6144c074fff0e9c7";
  private urlMoviedb: string = "https://api.themoviedb.org/3";
  private language: string = "fr-FR";

  constructor(private http: HttpClient) { }

  private getQuery(query: string, firstParam: boolean) {
    const startParam = firstParam ? '?' : '&';
    const url = "https://api.themoviedb.org/3" + query + startParam + "api_key=" + this.apikey + "&language=" + this.language + "&callback=JSONP_CALLBACK";
    return this.http.jsonp(url, "");
  }

  getLatestMovies() {
    return this.getQuery("/discover/movie?sort_by=popularity.desc", false).pipe(
      map((data: any) => data.results)
    );
  }

  getMovie(id: number) {
    return this.getQuery("/movie/" + id, true).pipe(
      map((data: any) => data)
    );
  }

  getMovieCredits(id: number) {
    return this.getQuery("/movie/" + id + "/credits", true).pipe(
      map((data: any) => data.cast)
    );
  }

}
