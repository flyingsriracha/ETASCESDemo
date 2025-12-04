import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VecuCalibrationComponent } from './vecu-calibration.component';

describe('VecuCalibrationComponent', () => {
  let component: VecuCalibrationComponent;
  let fixture: ComponentFixture<VecuCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VecuCalibrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VecuCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
