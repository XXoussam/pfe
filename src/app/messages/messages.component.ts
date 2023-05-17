import { Component, OnInit } from '@angular/core';
import {ChatService} from "../service/chat.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  allMyChats : any[]=[]
  lastMssgs:string[]=[];


  constructor(private chatService:ChatService) { }

  ngOnInit(): void {
    this.getAllChat();
  }

  getAllChat(){
    this.chatService.getCurrentUserChat().subscribe(
      (response)=>{
        console.log(response)
        this.allMyChats.push(...response)
        response.forEach(chat=>{
          this.getLastMssg(chat.profileId)
        })
      },error => {
        console.log(error)
      }
    )
  }

  getLastMssg(profileId:string){
    this.chatService.getLastMssg(profileId).subscribe(
      (response)=>{
        console.log(response)
        this.lastMssgs.push(response.mssg)
      },error => {
        console.log(error)
      }
    )
  }

}
