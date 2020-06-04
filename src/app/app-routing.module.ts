import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreedListComponent } from './pages/breed-list/breed-list.component';


const routes: Routes = [
  {
    path: '',
    component: BreedListComponent,
    pathMatch: 'full'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
