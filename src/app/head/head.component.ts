import {Component, HostListener, OnInit} from '@angular/core';
import {UserAuthService} from "../service/user-auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {GlobalService} from "../service/global.service";
import {interval, Subject, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  isContact! :boolean;
  isInscrit! :boolean;
  isHome! :boolean;
  isInscritArtist!:boolean;
  currentUrl ="";
  canAccess = false;
  profileId = "";
  isDropdownOpen: boolean = false;
  unreadNotif:any[]=[];

  constructor(private userAuthService:UserAuthService,private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log(this.currentUrl); // or do whatever you need with the current URL
        this.isContact = this.currentUrl !== "/contact";
        this.isHome = this.currentUrl !== "/login";
        this.isInscrit = this.currentUrl !== "/signup";
        this.isInscritArtist = this.currentUrl !== "/signupartist";

        if (this.currentUrl == "/home"){
          this.moveUp();
        }

      }
    });

    if (this.hasRole('Artiste')) {
      this.canAccess = true;
    }

    // @ts-ignore
    this.profileId = localStorage.getItem("ProfileId");

    this.getUnreadNotification();
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

  hasRole(role: string): boolean {
    const userRoles = this.userAuthService.getRoles() as { roleName: string, roleDescription: string }[];
    const roleName = userRoles.length > 0 ? userRoles[0].roleName : '';
    console.log(roleName);
    return role === roleName;

  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Prevent event propagation to avoid immediate closing

    this.isDropdownOpen = !this.isDropdownOpen;

    if (this.isDropdownOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.closeDropdown);
      });
    } else {
      document.removeEventListener('click', this.closeDropdown);
      //this.getUnreadNotification();
      this.resumeNotificationPolling();
    }
  }

  closeDropdown = () => {
    this.isDropdownOpen = false;
    document.removeEventListener('click', this.closeDropdown);
    //this.getUnreadNotification();
    this.resumeNotificationPolling();
  }
/************************************* START GET NOTIFICATION *************************************************/
  // Declare a subject to control pausing/resuming
private pauseSubject = new Subject<void>();

  getUnreadNotification() {
    interval(1000)
      .pipe(
        switchMap(() => this.userService.getUnreadNotif()),
        takeUntil(this.pauseSubject) // Stop polling when pauseSubject emits a value
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.unreadNotif = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

// Method to pause the polling
  pauseNotificationPolling() {
    this.pauseSubject.next(); // Emit a value to pause the polling
  }

// Method to resume the polling
  resumeNotificationPolling() {
    this.getUnreadNotification(); // Restart the polling
  }
/************************************* END GET NOTIFICATION *******************************************/

  setLastNotifDate() {
    this.userService.setLastNotifDate().subscribe(
      (response)=>{
        console.log(response)
        this.pauseNotificationPolling();
      },error => {
        console.log(error)
      }
    )
  }
}
