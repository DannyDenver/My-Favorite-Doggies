import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedListComponent } from './pages/breed-list/breed-list.component';
import { BreedDetailsComponent } from './pages/breed-details/breed-details.component';


const routes: Routes = [
  {
    path: '',
    component: BreedListComponent,
    pathMatch: 'full'
  },
  {
    path: 'breed/:id',
    component: BreedDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
