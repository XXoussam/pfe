import { Component, OnInit } from '@angular/core';
import {FileHandle} from "../models/FileHandle";
import {Publication} from "../models/publication";
import {DomSanitizer} from "@angular/platform-browser";
import {PublicationService} from "../service/publication.service";
import {Image} from "../models/image";
import {contenue} from "../models/contenue";
import {GlobalService} from "../service/global.service";
import {Artist} from "../models/artist";
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {error} from "highcharts";
import {ArtistService} from "../service/artist.service";

@Component({
  selector: 'app-discover-profile',
  templateUrl: './discover-profile.component.html',
  styleUrls: ['./discover-profile.component.css']
})
export class DiscoverProfileComponent implements OnInit {

  url: any;
  postsByOwner:Publication[] = [];
  profileId="";
  profile:any;
  isFollowed!:boolean;


  constructor(private sanitizer: DomSanitizer,private globalService : GlobalService,private route: ActivatedRoute,
              private publicationService:PublicationService,private userService:UserService,
              private artistService:ArtistService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
      this.profileId = id;
    });

    this.fetchByIdProfile(this.profileId);

    this.getPubByProfileId(this.profileId);
    console.log(this.postsByOwner)

    this.checkFollowed(this.profileId)
  }

  getPubByProfileId(profileId:string){
    this.publicationService.getPubByProfileId(profileId).subscribe(
      (response:Publication[])=>{
        console.log(response);
        this.postsByOwner = response;
      },error => {
        console.log(error)
      }
    )
  }

  fetchByIdProfile(profileId:string){
    this.userService.fetchByProfileId(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.profile = response;
      },error => {
        console.log(error)
      }
    )
  }


  follow(profileId: string) {
    this.userService.follow(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.isFollowed=true;
      },error => {
        console.log(error)
      }
    )
  }

  checkFollowed(profileId:string){
    this.userService.checkIfFollowed(profileId).subscribe(
      (response)=>{
        console.log(response)
        if (response){
          this.isFollowed=true;
        }
      },error=>{
        console.log(error)
      }
    )

  }

  unfollowArtist(profileId: string) {
    this.artistService.unfollow(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.isFollowed=false;
      },error => {
        console.log(error)
      }
    )

  }

}
