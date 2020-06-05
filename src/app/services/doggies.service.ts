import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Breed } from '../models/breed.model';
import { Observable } from 'rxjs';
import { publishReplay, refCount, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoggiesService {
  private doggies$: Observable<Breed[]>;
  private favorites$: Observable<Breed[]>;

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

  get favorites(): Observable<Breed[]> {
    if (!this.favorites$) {
      this.favorites$ = this.http.get<any>(this.url + '/favorites')
        .pipe(
          map(result => result.map(dog => dog.breed)),
          publishReplay(1),
          refCount()
        );
    }

    return this.favorites$;
  }

  get favoriteIds(): Observable<number[]> {
    return this.favorites.pipe(map((fav: Breed[]) => fav.map(x => x.id)));
  }
}
