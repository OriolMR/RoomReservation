import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesEditComponent } from './cities-edit.component';

describe('CitiesEditComponent', () => {
  let component: CitiesEditComponent;
  let fixture: ComponentFixture<CitiesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitiesEditComponent]
    });
    fixture = TestBed.createComponent(CitiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
