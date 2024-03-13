import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserRolesComponent } from './edit-user-roles.component';

describe('EditUserRolesComponent', () => {
  let component: EditUserRolesComponent;
  let fixture: ComponentFixture<EditUserRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserRolesComponent]
    });
    fixture = TestBed.createComponent(EditUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
