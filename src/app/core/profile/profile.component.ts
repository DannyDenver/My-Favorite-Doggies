import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Breed } from 'src/app/models/breed.model';

@Component({
  selector: 'doggies-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() breed: Breed;
  @Input() isDetailedProfile = false;
  @Input() randomDecimal: number = null;
  @Input() favorite = false;

  @Output() addToFavorites: EventEmitter<number> = new EventEmitter();
  @Output() removeFromFavorites: EventEmitter<number> = new EventEmitter();
  
  imageUrl: string;

  constructor() { }

  ngOnInit() {
    const randomIndex = Math.floor((this.randomDecimal || Math.random()) * Math.floor(this.breed.images.length));
    this.imageUrl = this.breed.images[randomIndex];
  }

  toggleIsFavorite() {
    this.favorite = !this.favorite;
    if(this.favorite) {
      this.addToFavorites.emit(this.breed.id);
    }else {
      this.removeFromFavorites.emit(this.breed.id)
    }
  }
}
