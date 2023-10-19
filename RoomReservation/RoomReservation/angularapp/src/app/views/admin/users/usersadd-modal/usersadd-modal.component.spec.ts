import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersaddModalComponent } from './usersadd-modal.component';

describe('UsersaddModalComponent', () => {
  let component: UsersaddModalComponent;
  let fixture: ComponentFixture<UsersaddModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersaddModalComponent]
    });
    fixture = TestBed.createComponent(UsersaddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
