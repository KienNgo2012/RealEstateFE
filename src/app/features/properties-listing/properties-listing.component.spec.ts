import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesListingComponent } from './properties-listing.component';

describe('PropertiesListingComponent', () => {
  let component: PropertiesListingComponent;
  let fixture: ComponentFixture<PropertiesListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesListingComponent]
    });
    fixture = TestBed.createComponent(PropertiesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
