import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';

@Component({
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: ['./public-services.component.scss']
})
export class PublicServicesComponent implements OnInit {

  @Input()
  home = false;

  openMore = true;

  constructor(private func: FunctionsService, activatedRoute: ActivatedRoute) {
    func.setTitle(activatedRoute.snapshot.data.title)
    // console.log(activatedRoute.snapshot.data.roles)
  }
  ngOnInit() {
  }

}
