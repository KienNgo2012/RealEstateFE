import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMenuLeftComponent } from './agent-menu-left.component';

describe('AgentMenuLeftComponent', () => {
  let component: AgentMenuLeftComponent;
  let fixture: ComponentFixture<AgentMenuLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentMenuLeftComponent]
    });
    fixture = TestBed.createComponent(AgentMenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
