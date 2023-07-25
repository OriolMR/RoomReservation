import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesDeleteComponent } from './cities-delete.component';

describe('CitiesDeleteComponent', () => {
  let component: CitiesDeleteComponent;
  let fixture: ComponentFixture<CitiesDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitiesDeleteComponent]
    });
    fixture = TestBed.createComponent(CitiesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
