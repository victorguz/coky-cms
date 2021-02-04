import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-navbar',
  templateUrl: './public-navbar.component.html',
  styleUrls: ['./public-navbar.component.scss']
})
export class PublicNavbarComponent implements OnInit {

  onShow = "none"

  constructor() { }

  ngOnInit() {
  }

  show(): void {
    if (this.onShow == 'none') {
      this.onShow = "flex"
    } else {
      this.onShow = "none"
    }
  }
}
