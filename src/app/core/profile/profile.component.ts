import { Component, OnInit, Input } from '@angular/core';
import { Breed } from 'src/app/models/breed.model';

@Component({
  selector: 'doggies-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() breed: Breed
  imageUrl: string;

  constructor() { }

  ngOnInit() {
    const random = Math.floor(Math.random() * Math.floor(this.breed.images.length));
    this.imageUrl = this.breed.images[random];
  }
}
