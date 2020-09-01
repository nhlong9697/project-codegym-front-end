import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TokenInterceptor } from './token-interceptor';
import { LoginComponent } from './views/auth/login/login.component';
import { SignupComponent } from './views/auth/signup/signup.component';
import { DetailUserComponent } from './views/user/detail-user/detail-user.component';
import {MatIconModule} from '@angular/material/icon';
import { CreatePostComponent } from './views/post/create-post/create-post.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateReservationComponent } from './views/reservation/create-reservation/create-reservation.component';
import { ListPostComponent } from './views/post/list-post/list-post.component';
// import { UserModule } from './views/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    DetailUserComponent,
    CreatePostComponent,
    CreateReservationComponent,
    ListPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    // UserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
