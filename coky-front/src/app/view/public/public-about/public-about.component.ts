import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';

@Component({
  selector: 'app-public-about',
  templateUrl: './public-about.component.html',
  styleUrls: ['./public-about.component.scss']
})
export class PublicAboutComponent implements OnInit {

  @Input()
  home = false;

  constructor(private func: FunctionsService, activatedRoute: ActivatedRoute) {
    func.setTitle(activatedRoute.snapshot.data.title)
    // console.log(activatedRoute.snapshot.data.roles)
  }

  ngOnInit() {
  }

}
