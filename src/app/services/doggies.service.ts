import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Breed } from '../models/breed.model';
import { Observable } from 'rxjs';
import { publishReplay, refCount, map } from 'rxjs/operators';
import { Favorite } from '../models/favorite.model';

@Injectable({
  providedIn: 'root'
})
export class DoggiesService {
  private doggies$: Observable<Breed[]>;
  private favorites$: Observable<Favorite[]>;

  url = environment.apiServiceUrl;

  constructor(private http: HttpClient) {}

  get breeds(): Observable<Breed[]> {
    if (!this.doggies$) {
      this.doggies$ = this.http.get<Breed[]>(this.url + '/breeds')
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.doggies$;
  }

  getBreed(id: number): Observable<Breed> {
    return this.breeds.pipe(map((data: Breed[]) => data.filter((breed: Breed) => breed.id === id)[0] || null));
  }

  get favorites(): Observable<Favorite[]> {
    if (!this.favorites$) {
      this.favorites$ = this.http.get<Favorite[]>(`${this.url}/favorites`)
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.favorites$;
  }

  get favoriteIds(): Observable<{}> {
    return this.favorites.pipe(
      map((fav: Favorite[]) => fav.reduce((map, x) => {map[x.breed.id] = x.id; return map}, {})));
  }

  addToFavorites(id: number) {
    this.favorites$ = null;
    const body = { breed_id: id };
    return this.http.post(`${this.url}/favorites/add`, body);
  }

  removeFromFavorites(id: number) {
    this.favorites$ = null;
    return this.http.delete(`${this.url}/favorites/${id}`);
  }
}
