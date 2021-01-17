import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input()
  images = [
    'assets/core/images/pensioners.jpg',
  ]
  @Input()
  logo = "LOGO";
  @Input()
  marca = "MARCA";
  @Input()
  platform_name = "Nombre Plataforma";
  @Input()
  developed = "Victorguz";
  @Input()
  link_developed = "https://github.com/victorguz";

  year = new Date().getFullYear()

  constructor() {
    console.log("Carousel")
  }

  ngOnInit(): void {
  }

}
