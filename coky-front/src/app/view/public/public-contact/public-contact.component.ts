import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';

@Component({
  selector: 'app-public-contact',
  templateUrl: './public-contact.component.html',
  styleUrls: ['./public-contact.component.scss']
})
export class PublicContactComponent implements OnInit {

  @Input()
  home = false;

  constructor(private func: FunctionsService, activatedRoute: ActivatedRoute) {
    func.setTitle(activatedRoute.snapshot.data.title)
    // console.log(activatedRoute.snapshot.data.roles)
  }
  ngOnInit() {
  }

}
