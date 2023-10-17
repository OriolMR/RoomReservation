import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesaddModalComponent } from './citiesadd-modal.component';

describe('CitiesaddModalComponent', () => {
  let component: CitiesaddModalComponent;
  let fixture: ComponentFixture<CitiesaddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitiesaddModalComponent]
    });
    fixture = TestBed.createComponent(CitiesaddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
