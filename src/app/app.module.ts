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
import { CreateHouseComponent } from './views/house/create-house/create-house.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HouseTileComponent } from './views/house/house-tile/house-tile.component'
import {HomeComponent} from './views/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ViewHouseComponent } from './views/house/view-house/view-house.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { CreateReservationComponent } from './views/reservation/create-reservation/create-reservation.component';
import { ListReservationUserComponent } from './views/reservation/list-reservation-user/list-reservation-user.component';
import { EditReservationComponent } from './views/reservation/edit-reservation/edit-reservation.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    DetailUserComponent,
    CreateHouseComponent,
    HouseTileComponent,
    HomeComponent,
    ViewHouseComponent,
    ProgressBarComponent
    HomeComponent,
    CreateReservationComponent,
    ListReservationUserComponent,
    EditReservationComponent
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
    MDBBootstrapModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
    NgxDropzoneModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
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
