import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Breed } from '../models/breed.model';

@Injectable({
  providedIn: 'root'
})
export class DoggiesService {
  url = environment.apiServiceUrl

  constructor(private http: HttpClient) {}

  getBreeds() {
    return this.http.get<Breed[]>(this.url + '/breeds')
  }
}
