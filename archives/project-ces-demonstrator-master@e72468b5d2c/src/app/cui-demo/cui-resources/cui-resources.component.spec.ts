import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuiResourcesComponent } from './cui-resources.component';

describe('CuiResourcesComponent', () => {
  let component: CuiResourcesComponent;
  let fixture: ComponentFixture<CuiResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuiResourcesComponent]
    });
    fixture = TestBed.createComponent(CuiResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
