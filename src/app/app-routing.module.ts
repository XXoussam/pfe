import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {LoginComponent} from "./login/login.component";
import {SimpleUserComponent} from "./simple-user/simple-user.component";
import {ArtistComponent} from "./artist/artist.component";
import {AuthGuard} from "./auth/auth.guard";
import {SignupArtistComponent} from "./signup-artist/signup-artist.component";
import {SignupComponent} from "./signup/signup.component";
import {VerifyCodeComponent} from "./verify-code/verify-code.component";
import {HomeComponent} from "./home/home.component";
import {HeadComponent} from "./head/head.component";
import {ContactComponent} from "./contact/contact.component";
import {AuthGuardVerify} from "./auth/auth-verify.guard";
import {MyProfileComponent} from "./my-profile/my-profile.component";

const routes: Routes = [
  {path: 'homeuser', component: SimpleUserComponent,canActivate:[AuthGuard],data:{roles:['User']}},
  {path: 'homeartist', component: ArtistComponent,canActivate:[AuthGuard],data:{roles:['Artiste']}},
  {path: 'login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  //{path: 'signupartist', component: SignupArtistComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'verify', component: VerifyCodeComponent/*, canActivate: [AuthGuardVerify], data: { submitted: false }*/},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'myprofile', component: MyProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
