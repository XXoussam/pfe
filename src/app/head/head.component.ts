import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../service/user-auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isContact! :boolean;
  isInscrit! :boolean;
  isLogin! :boolean;
  currentUrl ="";

  constructor(private userAuthService:UserAuthService,
              private router:Router,
              public userService:UserService) { }

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log(this.currentUrl); // or do whatever you need with the current URL
        this.isContact = this.currentUrl !== "/contact";
        this.isLogin = this.currentUrl !== "/login";
        this.isInscrit = this.currentUrl !== "/signup";
      }
    });


    this.moveUp();
  }

  moveUp() {
    let myBar = document.getElementById("header")
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos) {
        // @ts-ignore
        myBar.style.display = "block";
      } else {
        // @ts-ignore
        myBar.style.display = "none"
      }
      prevScrollpos = currentScrollPos;
    }
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);
  }

}
