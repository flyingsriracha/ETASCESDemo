import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CuiHeaderComponent } from './cui/cui-header/cui-header.component';
import { CuiSideNavigationComponent } from './cui/cui-side-navigation/cui-side-navigation.component';
import { CuiFooterComponent } from './cui/cui-footer/cui-footer.component';
import { ButtonModule } from 'primeng/button'; // Import PrimeNG ButtonModule
import { DividerModule } from 'primeng/divider'; // Import PrimeNG DividerModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ButtonModule, // Add ButtonModule
      ],
      declarations: [
        AppComponent,
        CuiHeaderComponent,
        CuiSideNavigationComponent,
        CuiFooterComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add CUSTOM_ELEMENTS_SCHEMA
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Common UI boilerplate application'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Common UI boilerplate application');
  });

});
