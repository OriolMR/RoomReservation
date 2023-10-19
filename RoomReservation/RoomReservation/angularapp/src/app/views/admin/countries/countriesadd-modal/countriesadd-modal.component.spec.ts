import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesaddModalComponent } from './countriesadd-modal.component';

describe('CountriesaddModalComponent', () => {
  let component: CountriesaddModalComponent;
  let fixture: ComponentFixture<CountriesaddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountriesaddModalComponent]
    });
    fixture = TestBed.createComponent(CountriesaddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
