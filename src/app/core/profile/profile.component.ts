import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Breed } from 'src/app/models/breed.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    const randomIndex = Math.floor((this.randomDecimal || Math.random()) * Math.floor(this.breed.images.length));
    this.imageUrl = this.breed.images[randomIndex];
  }

  toggleIsFavorite() {
    if (!this.favorite) {
      this.favorite = !this.favorite;
      this.addToFavorites.emit(this.breed.id);
    } else {
      this.dialog.open(PopupModalComponent, {
        data: {
          label: `Remove ${this.breed.name} from Favorites`,
          text: `Are you sure you would like to remove ${this.breed.name} from your favorites?`
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.favorite = !this.favorite;
          this.removeFromFavorites.emit(this.breed.id);
        }
      });
    }
  }
}
