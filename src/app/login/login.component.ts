import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {UserAuthService} from "../service/user-auth.service";
import {FormControl, FormGroup,Validators} from "@angular/forms";
import {GlobalService} from "../service/global.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm = new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.email]),
    userPassword:new FormControl('')
  })

  constructor(private router: Router,
              private route : ActivatedRoute,
              private userService:UserService,
              private userAuthService:UserAuthService) { }

  ngOnInit(): void {

  }

  login(myForm: FormGroup) {
    this.userService.login(myForm.value).subscribe(
      (response:any)=>{
        console.log(response.jwtToken);
        console.log(response.user.roles);
        console.log(response.user)
        localStorage.setItem("ProfileId",response.user.profileId)
        this.userAuthService.setRoles(response.user.roles)
        this.userAuthService.setToken(response.jwtToken)
        const role = response.user.roles[0].roleName;
        if (role === 'Artiste'){
          this.router.navigate(["/homeartist",response.user.profileId]);
        }else {
          this.router.navigate(["/profileuser",response.user.profileId]);
        }
      },error => {
        console.log(error)
      }
    );

  }

  get userName(){
    return this.myForm.get('userName')
  }
  get userPassword(){
    return this.myForm.get('userPassword')
  }

}
