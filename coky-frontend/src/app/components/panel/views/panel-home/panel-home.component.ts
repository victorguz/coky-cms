import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-panel-home',
  templateUrl: './panel-home.component.html',
  styleUrls: ['./panel-home.component.scss'],
})
export class PanelHomeComponent implements OnInit {
  /**
   * Component Variables starts with c_ and are private
   */
  private c_title = '';

  constructor(private functions:FunctionsService,private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe((data) => {
      if (data.title) {
        this.c_title = data.title;
        this.functions.setComponentTitle(this.c_title);
      }
    });
  }
  ngOnInit(): void {}
}
