import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  
  @Input() drawer;


  constructor() { }

  ngOnInit(): void {
  }

}
