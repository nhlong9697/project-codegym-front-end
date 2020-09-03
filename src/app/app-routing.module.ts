import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { DetailUserComponent } from './views/user/detail-user/detail-user.component';
import { SignupComponent } from './views/auth/signup/signup.component';

import { CreateHouseComponent } from './views/house/create-house/create-house.component'
import { UserGuard } from 'src/app/containers/guards/user/user.guard';
import { HomeComponent } from 'src/app/views/home/home.component'
import { CreateReservationComponent } from './views/reservation/create-reservation/create-reservation.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile/:name', component: DetailUserComponent, canActivate: [UserGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'createHouse', component: CreateHouseComponent, canActivate: [UserGuard]},
  { path: 'reservations/:houseId' , component: CreateReservationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
