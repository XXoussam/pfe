import { Component, OnInit } from '@angular/core';
import {Publication} from "../models/publication";
import {DomSanitizer} from "@angular/platform-browser";
import {PublicationService} from "../service/publication.service";
import {UserService} from "../service/user.service";
import {Artist} from "../models/artist";
import {ArtistService} from "../service/artist.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  animations:[
    /*******************************************************************/
    trigger('list1',[
      state('in',style({
        opacity : 1,
        transform: 'translateX(0)'
      })),
      transition('void => *',[style({
        opacity : 0,
        transform: 'translateX(-100px)'
      }),animate(300)]),
      transition('* => void',[
        animate(300,style({
          transform: 'translateX(100px)',
          opacity : 0
        }))
      ])
      /*transition('highlighted => normal',animate(300))*/
    ]),
  ]
})
export class AccueilComponent implements OnInit {
  url: any;
  followingPosts:Publication[] = []
  currentSimpleUser: any;
  allArtist: any[] = [];

  constructor(private sanitizer: DomSanitizer,
              private publicationService:PublicationService,private userService:UserService,private  artistService:ArtistService
              ) { }

  ngOnInit(): void {

    this.getFollowingPosts();
    // @ts-ignore
    this.getCurrentUser(localStorage.getItem("ProfileId"))
    this.getAllArtist();

  }




  getFollowingPosts(){
    this.publicationService.getFollowingPosts().subscribe(
      (response:any[])=>{
        this.followingPosts = response;
        console.log(response)
      },error => {
        console.log(error)
      }
    )
  }

  getCurrentUser(profileId:string){
    this.userService.fetchCurrentUser(profileId).subscribe(
      (response:any)=>{
        console.log("//////////////////"+JSON.stringify(response.following[0]))
        this.currentSimpleUser=response;

      },error=>{
        console.log(error)
      }
    )
  }

  getAllArtist(){
    this.artistService.getAllArtist().subscribe(
      (response:Artist[])=>{
        console.log(response)
        this.allArtist.push(...response)
      },error=>{
        console.log(error)
      }
    )
  }


  follow(profileId: string, i: number) {
    this.userService.follow(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.allArtist.splice(i,1)
      },error => {
        console.log(error)
      }
    )
  }
}
