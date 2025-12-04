import { TestBed } from '@angular/core/testing';

import { CuiThemeService } from './cui-theme.service';

describe('CuiThemeService', () => {
  let service: CuiThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuiThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#toggleMode', () => {
    let htmlElement: HTMLElement;

    beforeEach(() => {
      htmlElement = document.documentElement;
    });

    it('should toggle from light to dark mode', () => {
      htmlElement.setAttribute(service.modeAttr, 'light');
      service.toggleMode();
      expect(htmlElement.getAttribute(service.modeAttr)).toBe('dark');
    });

    it('should toggle from dark to light mode', () => {
      htmlElement.setAttribute(service.modeAttr, 'dark');
      service.toggleMode();
      expect(htmlElement.getAttribute(service.modeAttr)).toBe('light');
    });

    it('should set to dark mode if no mode is set', () => {
      htmlElement.removeAttribute(service.modeAttr);
      service.toggleMode();
      expect(htmlElement.getAttribute(service.modeAttr)).toBe('dark');
    });
  });
});
