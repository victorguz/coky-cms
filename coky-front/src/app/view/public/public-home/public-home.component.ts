import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Routes } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss']
})
export class PublicHomeComponent {

  constructor(private func: FunctionsService, activatedRoute: ActivatedRoute) {
    func.setTitle(activatedRoute.snapshot.data.title)
    // console.log(activatedRoute.snapshot.data.roles)
  }

}
