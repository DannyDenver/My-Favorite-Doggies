import { Component, OnInit } from '@angular/core';
import { DoggiesService } from 'src/app/services/doggies.service';
import { Breed } from 'src/app/models/breed.model';

@Component({
  selector: 'doggies-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})
export class BreedListComponent implements OnInit {
  breeds: Breed[]

  constructor(private doggyService: DoggiesService) { }

  ngOnInit() {
    this.doggyService.getBreeds().subscribe(breeds => {
      this.breeds = breeds;
    });
  }
}
