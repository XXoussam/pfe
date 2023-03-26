import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ArtistService} from "../service/artist.service";
import {Router} from "@angular/router";
import {GlobalService} from "../service/global.service";
import {SimpleUserService} from "../service/simple-user.service";

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {


  constructor(private artistService:ArtistService,
              private router:Router,
              private globalService:GlobalService,
              private simpleUserService:SimpleUserService) { }
  public resendDate!: Date ;

  ngOnInit(): void {
    console.log(this.globalService.myGlobalVariable)
  }

  verify(verifyForm:NgForm){
    let n1 = verifyForm.value.digit1;
    let n2 = verifyForm.value.digit2;
    let n3 = verifyForm.value.digit3.toString();
    let n4 = verifyForm.value.digit4;
    let n5 = verifyForm.value.digit5;
    let n6 = verifyForm.value.digit6;
    let n = n1+n2+n3+n4+n5+n6;

    console.log(n)
    let num = parseInt(n);
    if (this.globalService.myGlobalVariable == 'artiste'){
      this.artistService.saveArtist(num).subscribe(
        (result)=>{
          console.log(result)
          localStorage.removeItem('countDownDate');
          this.router.navigate(['/homeartist']);
        },error=>{
          alert(error.message)
          console.log(error.message)
        }
      )
    }else {
      this.simpleUserService.saveSimpleUser(num).subscribe(
        (result)=>{
          console.log(result)
          localStorage.removeItem('countDownDate');
          this.router.navigate(['/homeartist']);
        },error=>{
          alert(error.message)
          console.log(error.message)
        }
      )
    }


  }

  move(e:any,p:any,c:any,n:any) {
    var length = c.value.length ;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength){
      if (n!=""){
        n.focus();
      }
    }
    if (e.key === "Backspace"){
      if (p!=""){
        p.focus();
      }
    }
  }


  resendCode() {
    this.resendDate = new Date();
    this.artistService.resendCode().subscribe(
      (result)=>{
        console.log(result)

      },error=>{
        console.log(error.message)
      }
    )
  }
}
