import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuLeftComponent } from './user-menu-left.component';

describe('UserMenuLeftComponent', () => {
  let component: UserMenuLeftComponent;
  let fixture: ComponentFixture<UserMenuLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMenuLeftComponent]
    });
    fixture = TestBed.createComponent(UserMenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
