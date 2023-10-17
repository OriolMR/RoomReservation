import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservesDeleteComponent } from './reserves-delete.component';

describe('ReservesDeleteComponent', () => {
  let component: ReservesDeleteComponent;
  let fixture: ComponentFixture<ReservesDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservesDeleteComponent]
    });
    fixture = TestBed.createComponent(ReservesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
