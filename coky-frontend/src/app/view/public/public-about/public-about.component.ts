import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-about',
  templateUrl: './public-about.component.html',
  styleUrls: ['./public-about.component.scss']
})
export class PublicAboutComponent implements OnInit {

  @Input()
  home = false;

  constructor() { }

  ngOnInit() {
  }

}
