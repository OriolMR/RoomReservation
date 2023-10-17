import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficesDeleteComponent } from './offices-delete.component';

describe('OfficesDeleteComponent', () => {
  let component: OfficesDeleteComponent;
  let fixture: ComponentFixture<OfficesDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficesDeleteComponent]
    });
    fixture = TestBed.createComponent(OfficesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
