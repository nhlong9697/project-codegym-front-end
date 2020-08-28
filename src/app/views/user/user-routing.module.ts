import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { from } from 'rxjs';



const routes: Routes = [
  {
    path: '',
    component: ListUserComponent
  },
  {
    path: 'register',
    component: AddUserComponent
  },

  {
    path: 'edit/:id',
    component: UpdateUserComponent
  },
  {
    path: 'detail/:id',
    component: DetailUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }
