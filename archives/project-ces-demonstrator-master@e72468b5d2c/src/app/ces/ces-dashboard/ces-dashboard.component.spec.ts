import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CesDashboardComponent } from './ces-dashboard.component';

describe('CesDashboardComponent', () => {
  let component: CesDashboardComponent;
  let fixture: ComponentFixture<CesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
