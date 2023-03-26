import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SimpleUserComponent } from './simple-user/simple-user.component';
import { ArtistComponent } from './artist/artist.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupArtistComponent } from './signup-artist/signup-artist.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import {MatIconModule} from "@angular/material/icon";
import { CountDownComponent } from './verify-code/count-down/count-down.component';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from './head/head.component';
import { ContactComponent } from './contact/contact.component';
import {Router, RouterModule} from "@angular/router";
import { AproposProfileComponent } from './my-profile/apropos-profile/apropos-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PostProfileComponent } from './my-profile/post-profile/post-profile.component';
import { GalerieProfileComponent } from './my-profile/galerie-profile/galerie-profile.component';
import { CreatePostComponent } from './my-profile/create-post/create-post.component';
import { TopProfileComponent } from './my-profile/top-profile/top-profile.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { BeforeAfterComponent } from './home/before-after/before-after.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForbiddenComponent,
    LoginComponent,
    SimpleUserComponent,
    ArtistComponent,
    SignupArtistComponent,
    SignupComponent,
    VerifyCodeComponent,
    CountDownComponent,
    HomeComponent,
    HeadComponent,
    ContactComponent,
    AproposProfileComponent,
    MyProfileComponent,
    PostProfileComponent,
    GalerieProfileComponent,
    CreatePostComponent,
    TopProfileComponent,
    CarouselComponent,
    BeforeAfterComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatIconModule,
        RouterModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
