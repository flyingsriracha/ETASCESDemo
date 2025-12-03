import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { CuiSideNavigationComponent } from './cui-side-navigation.component';
import { CuiSideNavigationService } from './cui-side-navigation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { SideNavigationItem } from './cui-side-navigation-item.interface';

class MockCuiSideNavigationService {
  itemSubject = new BehaviorSubject<SideNavigationItem[]>([
    {
      label: 'Home',
      route: '/home',
      icon: 'cui-icon-home',
      class: '',
      tooltip: 'Home',
      target: '',
      alt: ''
    },
    {
      label: 'Common UI',
      route: null,
      icon: 'cui-icon-list',
      class: '',
      tooltip: '',
      target: '',
      alt: '',
      childrenOpen: false,
      children: [
        {
          label: 'Resources',
          route: null,
          icon: '',
          class: '',
          tooltip: '',
          target: '',
          alt: '',
          children: [
            {
              label: 'Resources overview',
              route: '/cui-resources',
              icon: '',
              class: '',
              tooltip: '',
              target: '',
              alt: ''
            },
            {
              label: 'Storybook',
              route: 'https://example.com',
              icon: '',
              class: '',
              tooltip: '',
              target: '_blank',
              alt: ''
            }
          ]
        }
      ]
    }
  ]);

  getItems() {
    return this.itemSubject.asObservable();
  }

  togglePin(event: Event) {
    (event.currentTarget as HTMLElement).blur();
  }

  close() { }

  open() { }

  toggleItems(event: Event, sideNavigationItem: SideNavigationItem) {
    (event.currentTarget as HTMLElement).blur();
    sideNavigationItem.childrenOpen = !sideNavigationItem.childrenOpen;
  }

  isClickInsideNavigation(event: MouseEvent): boolean {
    const target = event.target as HTMLElement;
    const navigationContainer = document.querySelector('.cui-side-navigation');
    return navigationContainer !== null && navigationContainer.contains(target);
  }

}

describe('CuiSideNavigationComponent', () => {
  let component: CuiSideNavigationComponent;
  let fixture: ComponentFixture<CuiSideNavigationComponent>;
  let sideNavigationService: MockCuiSideNavigationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CuiSideNavigationComponent],
      imports: [
        RouterTestingModule,
        ButtonModule,
        TooltipModule
      ],
      providers: [
        { provide: CuiSideNavigationService, useClass: MockCuiSideNavigationService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    sideNavigationService = TestBed.inject(CuiSideNavigationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuiSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case to check if the component is created successfully
  it('should create the side navigation component', () => {
    expect(component).toBeTruthy();
  });

  // Test case to check if the side navigation items are initialized correctly
  it('should initialize side navigation items', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.sideNavigationItems).toBeDefined();
    expect(component.sideNavigationItems.length).toBeGreaterThan(0);
    component.sideNavigationItems.forEach(item => {
      expect(item.label).toBeDefined();
      expect(item.route).toBeDefined();
    });
  });

  // Test case to check if the toggleSideNavigationPin method is called correctly
  it('should call toggleSideNavigationPin', () => {
    spyOn(sideNavigationService, 'togglePin');
    const button: DebugElement = fixture.debugElement.query(By.css('.cui-side-navigation-toggle-wrapper p-button'));
    button.triggerEventHandler('onClick', null);
    expect(sideNavigationService.togglePin).toHaveBeenCalled();
  });

  // Test case to check if the closeSideNavigation method is called correctly
  it('should call closeSideNavigation', () => {
    spyOn(sideNavigationService, 'close');
    component.closeSideNavigation();
    expect(sideNavigationService.close).toHaveBeenCalled();
  });

  // Test case to check if the openSideNavigation method is called correctly
  it('should call openSideNavigation', () => {
    spyOn(sideNavigationService, 'open');
    component.openSideNavigation();
    expect(sideNavigationService.open).toHaveBeenCalled();
  });

  // Test case to check if side navigation items toggle correctly
  it('should toggle side navigation items', () => {
    const sideNavigationItems = component.sideNavigationItems;
    const event = {
      currentTarget: {
        blur: jasmine.createSpy('blur')
      }
    } as unknown as Event;
  
    spyOn(sideNavigationService, 'toggleItems').and.callThrough();
  
    sideNavigationItems.forEach((menuItem, index) => {
      // Log the initial state of the menuItem
      console.log(`Initial state of menuItem ${index}:`, menuItem);
  
      component.toggleSideNavigationItems(event, menuItem);
  
      // Check if the service method was called
      expect(sideNavigationService.toggleItems).toHaveBeenCalledWith(event, menuItem);
      expect(menuItem.childrenOpen).toBeTrue();
  
      component.toggleSideNavigationItems(event, menuItem);
      expect(menuItem.childrenOpen).toBeFalse();
  
      // Log the final state of the menuItem
      console.log(`Final state of menuItem ${index}:`, menuItem);
    });
  });

  // Test case to check if simple items render correctly
  it('should render simple side navigation items', () => {
    const simpleItems = fixture.debugElement.queryAll(By.css('.cui-side-navigation-body .cui-side-navigation-item'));
    expect(simpleItems.length).toBeGreaterThan(0);
  });

  it('should render menu items with children', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('.cui-side-navigation-menu'));
    expect(menuItems.length).toBeGreaterThan(0);
  });

  // Test case to check if external URLs render correctly
  it('should render external URLs correctly', () => {
    const externalLinks = fixture.debugElement.queryAll(By.css('a[target="_blank"]'));
    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach(link => {
      expect(link.attributes['href']).toBeDefined();
      expect(link.attributes['target']).toBe('_blank');
    });
  });

  // Test case to check if tooltips are displayed correctly on hover
  it('should display tooltips correctly on hover', waitForAsync(() => {
    const sideNavigationItems = component.sideNavigationItems;
  
    // If there are no items, mark the test as pending
    if (sideNavigationItems.length === 0) {
      pending('No side navigation items to test');
      return;
    }
  
    sideNavigationItems.forEach((item, index) => {
      const simpleItem = fixture.debugElement.query(By.css(`.cui-side-navigation-item:nth-child(${index + 1})`));
      const tooltipText = item.tooltip;
  
      // Simulate mouseenter event to show tooltip
      simpleItem.triggerEventHandler('mouseenter', null);
      fixture.detectChanges();
  
      // Wait for tooltip to appear
      setTimeout(() => {
        const tooltips = document.documentElement.querySelectorAll('.p-tooltip');
  
        // Log the tooltip elements and their content
        tooltips.forEach((tooltip, tooltipIndex) => {
          console.log(`Tooltip ${tooltipIndex} element:`, tooltip);
          console.log(`Tooltip ${tooltipIndex} textContent:`, tooltip.textContent);
          expect(tooltip).toBeTruthy();
          expect(tooltip.textContent).toContain(tooltipText);
        });
  
        // Simulate mouseleave event to hide tooltip
        simpleItem.triggerEventHandler('mouseleave', null);
        fixture.detectChanges();
  
        setTimeout(() => {
          const hiddenTooltips = document.documentElement.querySelectorAll('.p-tooltip');
          expect(hiddenTooltips.length).toBe(0);
        }, 0); // tooltipHideDelay is 0
      }, 1000); // tooltipShowDelay is 1000
    });
  }));
});
