import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// Importo map reactive extentions
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MoviedbService {
  private apikey: string = "f9b276a8a665a41333c2def2f632a2e4";
  private urlMoviedb: string = "https://api.themoviedb.org/3";

  constructor(private http: HttpClient) {}

  //Metodo para pasar URL para peticion

  getQuery(query: string) {
    const url = `https://api.themoviedb.org/3${query}&api_key=${
      this.apikey
    }&language=es&callback=JSONP_CALLBACK`;

    //es importante verificar el uso de jsonp para poder hacer solicitud a otros dominios
    return this.http.jsonp(url, "");
  }

  getDiscoverMovies() {
    return this.getQuery("/discover/movie?sort_by=popularity.desc").pipe(
      map((data: any) => data.results)
    );
  }

  // Otra alternativa para hacer la consulta
  /*   getDiscoverMovies() {
  const url = `${
    this.urlMoviedb
  }/discover/movie?sort_by=popularity.desc&api_key=${
    this.apikey
  }&language=es&callback=JSONP_CALLBACK`;
  return this.http.jsonp(url, "").pipe(map((res: any) => res.results));
} */
}
