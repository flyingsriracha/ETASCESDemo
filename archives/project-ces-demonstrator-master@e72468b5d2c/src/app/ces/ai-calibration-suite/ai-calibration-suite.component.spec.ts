import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiCalibrationSuiteComponent } from './ai-calibration-suite.component';

describe('AiCalibrationSuiteComponent', () => {
  let component: AiCalibrationSuiteComponent;
  let fixture: ComponentFixture<AiCalibrationSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiCalibrationSuiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiCalibrationSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
