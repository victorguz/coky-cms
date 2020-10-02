import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel-navbar',
  templateUrl: './panel-navbar.component.html',
  styleUrls: ['./panel-navbar.component.scss'],
})
export class PanelNavbarComponent implements OnInit {
  /**
   * Component Variables starts with c_ and are private
   */
  
  private c_title = '';

  constructor() {}

  ngOnInit(): void {}
}
