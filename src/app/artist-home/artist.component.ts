import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FileHandle} from "../models/FileHandle";
import {PublicationService} from "../service/publication.service";
import {Publication} from "../models/publication";
import {contenue} from "../models/contenue";
import {Image} from "../models/image";
import {UserService} from "../service/user.service";
import {Artist} from "../models/artist";


@Component({
  selector: 'app-artist-home',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  imagesUploads: FileHandle[] = [];
  isEmojiPickerVisible!: boolean;
  textArea = 'add ...';
  url: any;
  postsByOwner:Publication[] = []
  currentArtist!: any;
  display=true;
  displayFollower=false;
  nbrFollowing!:number
  nbrFollower!:number

  constructor(private sanitizer: DomSanitizer,private userService : UserService,
              private publicationService:PublicationService) { }

  ngOnInit(): void {
    const myTextarea = document.getElementById("note");
    const myButton = document.getElementById("publier");
    // @ts-ignore
    myTextarea.addEventListener("input", function() {
      // @ts-ignore
      if (myTextarea.checkValidity()) {
        // @ts-ignore
        myButton.disabled = false;
      } else {
        // @ts-ignore
        myButton.disabled = true;
      }
    });

    this.getPostsByOwner();
    // @ts-ignore
    this.getCurrentUser(localStorage.getItem("ProfileId"))

  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const url = e.target.result;
          this.imagesUploads.push({file, url});
          console.log(url)
        };
        reader.readAsDataURL(file);
      }
    }
  }





  public addEmoji(event:any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  removeImages(i: number) {
    this.imagesUploads.splice(i,1);
  }



  addPublication() {
    let imgs = [];
    for (const imagesUpload of this.imagesUploads) {
      imgs.push(new Image(imagesUpload.url.toString()))
    }
    let contenuePub = new contenue(0,this.textArea, [],imgs,[])
    let pub = new Publication(contenuePub);
    console.log(pub)
    this.publicationService.addPublication(pub).subscribe(
      (response:any)=>{
        console.log(response);
        location.reload();
      },error => {
        console.log(error)
      }
    );
    this.textArea ='add ...';
    this.imagesUploads=[];

  }

  getPostsByOwner(){
    this.publicationService.getPostsByOwner().subscribe(
      (response:Publication[])=>{
        this.postsByOwner = response;
        console.log(response[0].contenu.comments)
      },error => {
        console.log(error)
      }
    )
  }

  getCurrentUser(profileId:string){
    this.userService.fetchCurrentUser(profileId).subscribe(
      (response:any)=>{
        console.log("*******************"+JSON.stringify(response))
        this.currentArtist=response;
        this.nbrFollowing=response.following.length
        this.nbrFollower=response.follower.length
      },error=>{
        console.log(error)
      }
    )
  }

  displayFollowing() {
    this.display = false;
    this.displayFollower=false;
    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const following = document.getElementById("following");
    // @ts-ignore
    following.classList.add("active")
  }

  displayTimeLine() {
    this.display=true;
    this.displayFollower=false;
    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const timeLine = document.getElementById("timeLine");
    // @ts-ignore
    timeLine.classList.add("active")

  }
  displayAllFollower() {
    this.display=false;
    this.displayFollower=true
    const elements = document.querySelectorAll('.header-link-item');
    elements.forEach(element => {
      element.classList.remove('active');
    });
    const timeLine = document.getElementById("followers");
    // @ts-ignore
    timeLine.classList.add("active")
  }


  handleVariableFollowing(variable: number) {
    this.nbrFollowing=variable;
  }


  handleVariableFollower(variable: number) {
    this.nbrFollower=variable
  }
}
