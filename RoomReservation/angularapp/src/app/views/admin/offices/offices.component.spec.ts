import { ComponentFixture, TestBed } from '@angular/core/testing';

import { officesComponent } from './offices.component';

describe('OfficesComponent', () => {
  let component: officesComponent;
  let fixture: ComponentFixture<officesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [officesComponent]
    });
    fixture = TestBed.createComponent(officesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
