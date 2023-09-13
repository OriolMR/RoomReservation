import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservesAdminComponent } from './reserves-admin.component';

describe('ReservesAdminComponent', () => {
  let component: ReservesAdminComponent;
  let fixture: ComponentFixture<ReservesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservesAdminComponent]
    });
    fixture = TestBed.createComponent(ReservesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
