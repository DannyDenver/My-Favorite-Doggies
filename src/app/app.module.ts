import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './core/header/header.component';
import { BreedListComponent } from './pages/breed-list/breed-list.component';
import { ProfileComponent } from './core/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BreedDetailsComponent } from './pages/breed-details/breed-details.component';
import { FavoritesListComponent } from './pages/favorites-list/favorites-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreedListComponent,
    ProfileComponent,
    BreedDetailsComponent,
    FavoritesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
