import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoggiesService } from 'src/app/services/doggies.service';
import { Breed } from 'src/app/models/breed.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'doggies-breed-details',
  templateUrl: './breed-details.component.html',
  styleUrls: ['./breed-details.component.scss']
})

export class BreedDetailsComponent implements OnInit {
  breed: Breed;
  favoriteIds: number[];

  constructor(
    private route: ActivatedRoute,
    private doggiesService: DoggiesService,
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    forkJoin(this.doggiesService.getBreed(id), this.doggiesService.favoriteIds).subscribe((result: [Breed, number[]]) => {
      this.breed = result[0] || null;
      this.favoriteIds = result[1] || [];
    });
  }
}
