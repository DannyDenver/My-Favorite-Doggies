import { Component, OnInit } from '@angular/core';
import { DoggiesService } from 'src/app/services/doggies.service';
import { Breed } from 'src/app/models/breed.model';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'doggies-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})
export class BreedListComponent implements OnInit {
  breeds: Breed[];
  favoriteIds: number[];
  randomDecimal: number;

  constructor(private doggiesService: DoggiesService) { }

  ngOnInit() {
    this.randomDecimal = Math.random();

    forkJoin(this.doggiesService.breeds, this.doggiesService.favoriteIds).subscribe((res: [Breed[], number[]]) => {
      this.breeds = res[0] || [];
      this.favoriteIds = res[1] || [];
    });
  }
}
