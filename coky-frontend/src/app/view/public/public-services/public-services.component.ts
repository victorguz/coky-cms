import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: ['./public-services.component.scss']
})
export class PublicServicesComponent implements OnInit {

  @Input()
  home = false;

  constructor() { }

  ngOnInit() {
  }

}
