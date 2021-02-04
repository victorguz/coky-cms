import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPricesComponent } from './public-prices.component';

describe('PublicPricesComponent', () => {
  let component: PublicPricesComponent;
  let fixture: ComponentFixture<PublicPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
