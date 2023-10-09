import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrieseditModalComponent } from './countriesedit-modal.component';

describe('CountrieseditModalComponent', () => {
  let component: CountrieseditModalComponent;
  let fixture: ComponentFixture<CountrieseditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountrieseditModalComponent]
    });
    fixture = TestBed.createComponent(CountrieseditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
