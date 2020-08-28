import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TokenInterceptor } from './token-interceptor';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
@NgModule({
  declarations: [AppComponent, LoginComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
=======
import { LayoutComponent } from './views/layout/layout.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
>>>>>>> tuyen_dev
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
