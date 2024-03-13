import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentUpdatePropertiesComponent } from './agent-update-properties.component';

describe('AgentUpdatePropertiesComponent', () => {
  let component: AgentUpdatePropertiesComponent;
  let fixture: ComponentFixture<AgentUpdatePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentUpdatePropertiesComponent]
    });
    fixture = TestBed.createComponent(AgentUpdatePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
