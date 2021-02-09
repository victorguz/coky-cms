import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionsService } from 'src/app/config/functions.config';

@Component({
  selector: 'app-public-prices',
  templateUrl: './public-prices.component.html',
  styleUrls: ['./public-prices.component.scss']
})
export class PublicPricesComponent implements OnInit {

  @Input()
  home = false;

  constructor(private func: FunctionsService, activatedRoute: ActivatedRoute) {
    func.setTitle(activatedRoute.snapshot.data.title)
    // console.log(activatedRoute.snapshot.data.roles)
  }
  ngOnInit() {
  }

}
