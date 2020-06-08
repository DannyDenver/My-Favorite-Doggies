import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Breed } from '../models/breed.model';
import { Observable } from 'rxjs';
import { publishReplay, refCount, map, switchMap } from 'rxjs/operators';
import { Favorite } from '../models/favorite.model';

@Injectable({
  providedIn: 'root'
})
export class DoggiesService {
  private doggies$: Observable<Breed[]>;
  private favorites$: Observable<Favorite[]>;

  url = environment.apiServiceUrl;

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<Breed[]> {
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
    return this.getBreeds().pipe(map((data: Breed[]) => data.filter((breed: Breed) => breed.id === id)[0] || null));
  }

  getFavorites(): Observable<Favorite[]> {
    if (!this.favorites$) {
      this.favorites$ = this.http.get<Favorite[]>(`${this.url}/favorites`)
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.favorites$;
  }

  /** Returns a hashmap of breedId as key and favorite id as value */
  getFavoriteIds(): Observable<{}> {
    return this.getFavorites().pipe(
      map((favorites: Favorite[]) => favorites.reduce((hashMap, x) => {hashMap[x.breed.id] = x.id; return hashMap; }, {})));
  }

  addToFavorites(id: number): Observable<{}>  {
    this.favorites$ = null;
    const body = { breed_id: id };
    return this.http.post(`${this.url}/favorites/add`, body)
          .pipe(switchMap(() => this.getFavoriteIds()));
  }

  removeFromFavorites(id: number) {
    this.favorites$ = null;
    return this.http.delete(`${this.url}/favorites/${id}`);
  }
}
