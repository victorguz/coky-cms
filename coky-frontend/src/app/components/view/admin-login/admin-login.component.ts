import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  
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
    this.router.navigate([FunctionsService.getRoute('admin', 'home')]);
  }
}
