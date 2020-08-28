import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { LoginComponent } from './auth/login/login.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent },
=======
import { LoginComponent } from './views/login/login.component';
import { LayoutComponent } from './views/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   component:
  // },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)
      }
      // {
      //   path: '/custer'
      // }
    ]
  }
>>>>>>> tuyen_dev
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
