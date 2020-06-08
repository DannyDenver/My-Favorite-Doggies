import { Component, OnInit } from '@angular/core';
import { DoggiesService } from 'src/app/services/doggies.service';
import { Breed } from 'src/app/models/breed.model';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'doggies-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})

export class BreedListComponent implements OnInit {
  breeds: Breed[];
  favoriteIdHash: {};
  randomDecimal: number;
  favoriteBreedIds: number[];

  constructor(private doggiesService: DoggiesService) { }

  ngOnInit() {
    this.randomDecimal = Math.random();

    forkJoin(this.doggiesService.getBreeds(), this.doggiesService.getFavoriteIds()).subscribe((res: [Breed[], object]) => {
      this.breeds = res[0] || [];
      this.favoriteIdHash = res[1] || [];
      this.favoriteBreedIds = Object.keys(this.favoriteIdHash).map(x => Number(x));
    });
  }

  addToFavorites(breedId: number) {
    this.doggiesService.addToFavorites(breedId)
      .subscribe((favoriteIds) => {
        this.favoriteIdHash = favoriteIds;
        this.favoriteBreedIds = Object.keys(favoriteIds).map(x => Number(x));
      });
  }

  removeFromFavorites(breedId: number) {
    this.doggiesService.removeFromFavorites(this.favoriteIdHash[breedId]).subscribe(() => {
      delete this.favoriteIdHash[breedId];
      this.favoriteBreedIds = this.favoriteBreedIds.filter(x => x !== breedId);
    });
  }
}
