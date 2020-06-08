import { Component, OnInit } from '@angular/core';
import { DoggiesService } from 'src/app/services/doggies.service';
import { Favorite } from 'src/app/models/favorite.model';

@Component({
  selector: 'doggies-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss']
})
export class FavoritesListComponent implements OnInit {
  favorites: Favorite[];
  randomDecimal: number;

  constructor(private doggiesService: DoggiesService) { }

  ngOnInit() {
    this.randomDecimal = Math.random();
    this.doggiesService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  removeFromFavorites(favorite: Favorite) {
    this.doggiesService.removeFromFavorites(favorite.id).subscribe(() => {
      this.favorites = this.favorites.filter(breed => breed.id !== favorite.id);
    });
  }
}
