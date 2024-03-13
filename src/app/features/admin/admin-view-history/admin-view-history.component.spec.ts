import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewHistoryComponent } from './admin-view-history.component';

describe('AdminViewHistoryComponent', () => {
  let component: AdminViewHistoryComponent;
  let fixture: ComponentFixture<AdminViewHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewHistoryComponent]
    });
    fixture = TestBed.createComponent(AdminViewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
