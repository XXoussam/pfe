import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-before-after',
  templateUrl: './before-after.component.html',
  styleUrls: ['./before-after.component.css']
})
export class BeforeAfterComponent implements OnInit {
  @Input("slide_script") slide_script = "";

  constructor() { }

  ngOnInit(): void {
  }

}
