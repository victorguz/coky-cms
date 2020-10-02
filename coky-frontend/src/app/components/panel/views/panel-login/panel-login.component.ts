import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panel-login',
  templateUrl: './panel-login.component.html',
})
export class PanelLoginComponent implements OnInit {
  /**
   * Component Variables starts with c_ and are private
   */
  private c_title = '';

  constructor(
    private functions: FunctionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe((data) => {
      if (data.title) {
        this.c_title = data.title;
        this.functions.setComponentTitle(this.c_title);
      }
    });
  }

  ngOnInit(): void {}

  /**
   * This method is to log in
   */
  public login() {
    console.log("login")
    this.router.navigate([FunctionsService.getRoute('panel', 'home')]);
  }
}
