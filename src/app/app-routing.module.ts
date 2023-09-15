import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { HomePageComponent } from './view/home-page/home-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomePageComponent },
  // Các route khác
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }