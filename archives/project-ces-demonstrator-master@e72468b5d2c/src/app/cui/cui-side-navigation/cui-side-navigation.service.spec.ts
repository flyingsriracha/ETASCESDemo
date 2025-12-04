import { TestBed, fakeAsync } from '@angular/core/testing';

import { CuiSideNavigationService } from './cui-side-navigation.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, of } from 'rxjs';
import { CuiSideNavigationItems } from 'src/app/cui-side-navigation-items';
import { sideNavigationCSSClass, sideNavigationOpenCSSClass, sideNavigationPinCSSClass } from '../shared/cui-constants';
import { SideNavigationItem } from './cui-side-navigation-item.interface';

describe('CuiSideNavigationService', () => {
  let service: CuiSideNavigationService;
  let router: Router;

  beforeEach(() => {
    const mockRouter = {
      events: of(new NavigationEnd(0, '/test', '/test')).pipe(
        filter((event) => event instanceof NavigationEnd)
      )
    };

    TestBed.configureTestingModule({
      providers: [
        CuiSideNavigationService,
        { provide: Router, useValue: mockRouter }
      ]
    });

    service = TestBed.inject(CuiSideNavigationService);
    router = TestBed.inject(Router);

    service.sideNavigationItems = CuiSideNavigationItems;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize side navigation items from the provided items', () => {
    expect(service.sideNavigationItems).toEqual(CuiSideNavigationItems);
  });

  it('should initialize necessary CSS classes', () => {
    expect(service.sideNavigationClass).toBe(sideNavigationCSSClass);
    expect(service.pinnedClass).toBe(sideNavigationPinCSSClass);
    expect(service.openedClass).toBe(sideNavigationOpenCSSClass);
  });

  it('should disable side navigation if no items are provided', () => {
    spyOn(service, 'disable');
    service.sideNavigationItems = [];
    service.initSideNavigation();
    expect(service.disable).toHaveBeenCalled();
  });

  it('should enable side navigation if items are provided', () => {
    spyOn(service, 'enable');
    service.initSideNavigation();
    expect(service.enable).toHaveBeenCalled();
  });

  it('should open the side navigation', () => {
    const body: any = document.querySelector('body');
    service.open();
    expect(body.classList.contains(sideNavigationOpenCSSClass)).toBeTrue();
  });

  it('should close the side navigation', () => {
    const body: any = document.querySelector('body');
    body.classList.add(sideNavigationOpenCSSClass);
    service.close();
    expect(body.classList.contains(sideNavigationOpenCSSClass)).toBeFalse();
  });


  it('should update the current route on navigation end', fakeAsync(() => {
    const navigationEnd = new NavigationEnd(0, '/test', '/test');
    service.handleActivatedRoute(navigationEnd);
    expect(service.currentRoute).toBe('/test'); 
  }));

});
