import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoggiesService } from 'src/app/services/doggies.service';
import { Breed } from 'src/app/models/breed.model';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'doggies-breed-details',
  templateUrl: './breed-details.component.html',
  styleUrls: ['./breed-details.component.scss']
})

export class BreedDetailsComponent implements OnInit {
  breed: Breed;
  favorites: {};
  favoriteIds: number[];

  constructor(
    private route: ActivatedRoute,
    private doggiesService: DoggiesService,
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin(this.doggiesService.getBreed(id), this.doggiesService.favoriteIds).subscribe((result: [Breed, number[]]) => {
      this.breed = result[0] || null;
      this.favorites = result[1] || [];
      this.favoriteIds = Object.keys(this.favorites).map(x => Number(x));
    });
  }

  addToFavorites(id: number) {
    this.doggiesService.addToFavorites(id)
      .pipe(switchMap(() => this.doggiesService.favoriteIds))
      .subscribe((favoriteIds) => {
        this.favoriteIds = Object.keys(favoriteIds).map(x => Number(x));
      });
  }

  removeFromFavorites(id: number) {
    this.doggiesService.removeFromFavorites(this.favorites[id]).subscribe(() => {
      delete this.favorites[id];
      this.favoriteIds = this.favoriteIds.filter(x => x !== id);
    });
  }
}
