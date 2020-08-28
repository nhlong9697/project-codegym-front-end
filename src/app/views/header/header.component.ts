import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;

  constructor(private httpClient: HttpClient,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }
  goToUserProfile(){
    this.router.navigateByUrl('/user-profile/' + this.username)
  }

  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
}
