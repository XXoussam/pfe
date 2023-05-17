import {Component, Input, OnInit} from '@angular/core';
import {Image} from "../../../models/image";

@Component({
  selector: 'app-display-imgs',
  templateUrl: './display-imgs.component.html',
  styleUrls: ['./display-imgs.component.css']
})
export class DisplayImgsComponent implements OnInit {
  @Input('urls') images : Image[] = [];


  constructor() { }

  ngOnInit(): void {
  }

}
