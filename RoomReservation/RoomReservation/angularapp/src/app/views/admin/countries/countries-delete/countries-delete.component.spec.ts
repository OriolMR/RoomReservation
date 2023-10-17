import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesDeleteComponent } from './countries-delete.component';

describe('CountriesDeleteComponent', () => {
  let component: CountriesDeleteComponent;
  let fixture: ComponentFixture<CountriesDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CountriesDeleteComponent]
    });
    fixture = TestBed.createComponent(CountriesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
