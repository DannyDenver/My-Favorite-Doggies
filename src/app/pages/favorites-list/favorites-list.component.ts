import { Component, OnInit } from '@angular/core';
import { DoggiesService } from 'src/app/services/doggies.service';
import { Breed } from 'src/app/models/breed.model';
import { Favorite } from 'src/app/models/favorite.model';

@Component({
  selector: 'doggies-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites: Favorite[];

  constructor(private doggiesService: DoggiesService) { }

  ngOnInit() {
    this.doggiesService.favorites.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  removeFromFavorites(favorite: Favorite) {
    this.doggiesService.removeFromFavorites(favorite.id).subscribe(() => {
      this.favorites = this.favorites.filter(breed => breed.id !== favorite.id);
    });
  }
}
