import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {Artist} from "../models/artist";
import {NgForm} from "@angular/forms";
import {ArtistService} from "../service/artist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-artist',
  templateUrl: './signup-artist.component.html',
  styleUrls: ['./signup-artist.component.css']
})
export class SignupArtistComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,
              private artistService:ArtistService,
              private router:Router) { }

  ngOnInit(): void {
  }

  /*verifyMails(email:string){
    this.spinner.show();
    this.clientService.allemails().subscribe(
      (result)=>{
        console.log(result)
        this.spinner.hide();
        this.emails=[];
        this.emails.push.apply(this.emails,result);
        if (this.emails.includes(email)){
          alert('this mail already exist')
        }
      },error => {
        this.spinner.hide();
      }
    );
  }*/


  signup(signupForm: NgForm) {
    let artist = new Artist();
    artist.name = signupForm.value.name;
    artist.userName = signupForm.value.email;
    artist.userPassword = signupForm.value.userPassword;
    artist.lastName = signupForm.value.lastname;
    artist.specialite = signupForm.value.specialite;
    artist.cin = signupForm.value.cin;
    artist.description = signupForm.value.description;
    console.log(artist)
    this.artistService.addArtist(artist).subscribe(
      (result:Artist)=>{
        console.log(result)
        this.router.navigate(['/verify']);
      },error=>{
        alert('this Email already exist')
      }
    )

  }

}
