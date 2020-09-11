import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../containers/services/auth/auth.service';
import {Router} from '@angular/router';
import { UpdateUserRequest } from 'src/app/containers/model/auth/update-user-request';
import {Observable, throwError} from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  imageRef: Observable<string | null>;


  constructor(
    private httpClient: HttpClient,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();

    this.getUserByUsername();
  }

  goToUserUpdate(): void{
    this.router.navigateByUrl('/user-update/' + this.username);
  }

  goToChangePass(): void{
    this.router.navigateByUrl('/user/change-pass/' + this.username);
  }

  goToHouses(): void{
    this.router.navigateByUrl('/houses');
  }

  logout(): void{
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

  getUserByUsername = () => {
    this.authService.getUserByUsername(this.username).subscribe(
      (res) => {
        this.imageRef = this.storage.ref(res.image).getDownloadURL();
        // console.log(res);
      },
      (rej) => {
        console.log('Get user failed!');
      }
    );
  };

}
