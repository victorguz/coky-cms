import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-carousel-brand',
  templateUrl: './admin-carousel-brand.component.html',
  styleUrls: ['./admin-carousel-brand.component.scss']
})
export class AdminCarouselBrandComponent implements OnInit {


  @Input()
  images = [
    'assets/built-in/images/pensioners.jpg',
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
  @Input()
  timeInterval = 3000;
  year = new Date().getFullYear()


  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }
  timerId;

  carouselChangeInterval(): void {
    if (!this.timerId) {
      this.timerId = setInterval(function () {

      }, this.timeInterval);
    }
  }

}
