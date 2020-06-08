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
  favoriteIds: number[];

  constructor(private doggiesService: DoggiesService) { }

  ngOnInit() {
    this.randomDecimal = Math.random();

    forkJoin(this.doggiesService.breeds, this.doggiesService.favoriteIds).subscribe((res: [Breed[], object]) => {
      this.breeds = res[0] || [];
      this.favoriteIdHash = res[1] || [];
      this.favoriteIds = Object.keys(this.favoriteIdHash).map(x => Number(x));
    });
  }

  addToFavorites(breedId: number) {
    this.doggiesService.addToFavorites(breedId)
      .pipe(switchMap(() => this.doggiesService.favoriteIds))
      .subscribe((favoriteIds) => {
        this.favoriteIdHash = favoriteIds;
        this.favoriteIds = Object.keys(favoriteIds).map(x => Number(x));
      });
  }

  removeFromFavorites(breedId: number) {
    this.doggiesService.removeFromFavorites(this.favoriteIdHash[breedId]).subscribe(() => {
      delete this.favoriteIdHash[breedId];
      this.favoriteIds = this.favoriteIds.filter(x => x !== breedId);
    });
  }
}
