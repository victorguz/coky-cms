import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-prices',
  templateUrl: './public-prices.component.html',
  styleUrls: ['./public-prices.component.scss']
})
export class PublicPricesComponent implements OnInit {

  @Input()
  home = false;

  constructor() { }

  ngOnInit() {
  }

}
