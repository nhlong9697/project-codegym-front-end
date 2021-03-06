import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { DetailUserComponent } from './views/user/detail-user/detail-user.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { CreateHouseComponent } from './views/house/create-house/create-house.component'
import { UserGuard } from 'src/app/containers/guards/user/user.guard';
import { ListHouseComponent } from 'src/app/views/house/list-house/list-house.component'
import { ViewHouseComponent } from 'src/app/views/house/view-house/view-house.component'
import { CreateReservationComponent } from './views/reservation/create-reservation/create-reservation.component';
import { ListReservationUserComponent } from './views/reservation/list-reservation-user/list-reservation-user.component';
import { EditReservationComponent } from './views/reservation/edit-reservation/edit-reservation.component';
import {HomeComponent} from './views/home/home.component';
import { ListReservationHouseComponent } from './views/reservation/list-reservation-house/list-reservation-house.component';
import { ListHouseUserComponent } from 'src/app/views/house/list-house-user/list-house-user.component';
import { UpdateUserComponent } from './views/user/update-user/update-user.component';
import { UpdatePasswordComponent } from './views/user/update-password/update-password.component';
import { ListHouseByUserComponent } from './views/house/list-house-by-user/list-house-by-user.component'


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'houses', component: ListHouseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user-profile/:name', component: DetailUserComponent, canActivate: [UserGuard] },
  { path: 'user-update/:username', component: UpdateUserComponent, canActivate: [UserGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'create-house', component: CreateHouseComponent, canActivate: [UserGuard]},
  { path: 'view-house/:houseId', component: ViewHouseComponent },
  { path: 'reservations/:houseId' , component: CreateReservationComponent,canActivate: [UserGuard] },
  { path: 'reservations/by-user/:username', component: ListReservationUserComponent, canActivate: [UserGuard] },
  { path: 'reservations/update/:id', component: EditReservationComponent, canActivate: [UserGuard] },
  { path: 'get-reservations-by-house/:houseId', component: ListReservationHouseComponent, canActivate: [UserGuard] },
  { path: 'houses-owned-user/:username', component: ListHouseUserComponent, canActivate: [UserGuard] },
  { path: 'user/change-pass/:username', component: UpdatePasswordComponent, canActivate: [UserGuard]},
  { path: 'list-house/:username', component: ListHouseByUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
