import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarouselBrandComponent } from './admin-carousel-brand.component';

describe('AdminCarouselBrandComponent', () => {
  let component: AdminCarouselBrandComponent;
  let fixture: ComponentFixture<AdminCarouselBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCarouselBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarouselBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
