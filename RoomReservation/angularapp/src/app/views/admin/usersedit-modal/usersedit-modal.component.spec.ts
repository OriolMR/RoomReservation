import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserseditModalComponent } from './usersedit-modal.component';

describe('UserseditModalComponent', () => {
  let component: UserseditModalComponent;
  let fixture: ComponentFixture<UserseditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserseditModalComponent]
    });
    fixture = TestBed.createComponent(UserseditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
