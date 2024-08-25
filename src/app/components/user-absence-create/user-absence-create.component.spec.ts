import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAbsenceCreateComponent } from './user-absence-create.component';

describe('UserAbsenceCreateComponent', () => {
  let component: UserAbsenceCreateComponent;
  let fixture: ComponentFixture<UserAbsenceCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAbsenceCreateComponent]
    });
    fixture = TestBed.createComponent(UserAbsenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
