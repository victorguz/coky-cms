import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDatabasesComponent } from './admin-databases.component';

describe('AdminDatabasesComponent', () => {
  let component: AdminDatabasesComponent;
  let fixture: ComponentFixture<AdminDatabasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDatabasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
