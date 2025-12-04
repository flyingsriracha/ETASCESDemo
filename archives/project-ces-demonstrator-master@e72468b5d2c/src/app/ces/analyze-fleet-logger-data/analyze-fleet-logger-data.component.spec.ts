import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeFleetLoggerDataComponent } from './analyze-fleet-logger-data.component';

describe('AnalyzeFleetLoggerDataComponent', () => {
  let component: AnalyzeFleetLoggerDataComponent;
  let fixture: ComponentFixture<AnalyzeFleetLoggerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyzeFleetLoggerDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeFleetLoggerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
