import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDatabasesComponent } from './panel-databases.component';

describe('PanelDatabasesComponent', () => {
  let component: PanelDatabasesComponent;
  let fixture: ComponentFixture<PanelDatabasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelDatabasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
