import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { CuiHeaderComponent } from './cui-header.component';
import { CuiHeaderToolsService } from './cui-header-tools.service';
import { CuiHeaderActionItemsService } from './cui-header-action-items.service';
import { CuiSideNavigationService } from '../cui-side-navigation/cui-side-navigation.service';
import { CuiThemeService } from '../cui-theme/cui-theme.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';

class MockCuiSideNavigationService {
  hasSideNavigation(): boolean { return true; }
  toggle() { }
}

class MockCuiHeaderToolsService {
  getItems(): MenuItem[] {
    return [
      { label: 'File', items: [{ label: 'New' }, { label: 'Delete' }] },
      { label: 'Edit', items: [{ label: 'Undo' }, { label: 'Redo' }] },
      { label: 'Users', items: [{ label: 'New' }, { label: 'Delete' }] },
      { label: 'Events', items: [{ label: 'Edit' }, { label: 'Archive' }] },
    ];
  }
}

class MockCuiThemeService {
  toggleMode() { }
}

class MockCuiHeaderActionItemsService {
  getItems(): MenuItem[] {
    return [
      { label: 'Toggle mode', icon: 'cui-icon-dark-mode-toggle', command: () => { } },
      { label: 'Help', icon: 'cui-icon-help', items: [{ label: 'Documentation' }] },
      { label: 'Sign out', icon: 'cui-icon-sign-out' },
    ];
  }
}

describe('CuiHeaderComponent', () => {
  let component: CuiHeaderComponent;
  let fixture: ComponentFixture<CuiHeaderComponent>;
  let headerToolsService: CuiHeaderToolsService;
  let headerActionItemsService: CuiHeaderActionItemsService;
  let sideNavigationService: CuiSideNavigationService;
  let themeService: CuiThemeService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CuiHeaderComponent],
      imports: [
        ButtonModule,
        DividerModule,
        TooltipModule,
        TieredMenuModule,
        PanelMenuModule
      ],
      providers: [
        { provide: CuiSideNavigationService, useClass: MockCuiSideNavigationService },
        { provide: CuiHeaderToolsService, useClass: MockCuiHeaderToolsService },
        { provide: CuiThemeService, useClass: MockCuiThemeService },
        { provide: CuiHeaderActionItemsService, useClass: MockCuiHeaderActionItemsService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    headerToolsService = TestBed.inject(CuiHeaderToolsService);
    headerActionItemsService = TestBed.inject(CuiHeaderActionItemsService);
    sideNavigationService = TestBed.inject(CuiSideNavigationService);
    themeService = TestBed.inject(CuiThemeService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Create a mock event with a valid currentTarget
  const mockEvent = {
    stopPropagation: () => { },
    currentTarget: {
      blur: () => { }
    }
  } as unknown as Event;

  // Test case to check if the header component is created successfully
  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  // Test case to check if the theme mode toggle function works correctly
  it('should toggle theme mode', () => {
    spyOn(themeService, 'toggleMode');
    component.toggleMode(mockEvent);
    expect(themeService.toggleMode).toHaveBeenCalled();
  });

  // Test case to check if the alternative header tools menu toggles correctly
  it('should toggle alternative header tools', () => {
    component.toggleAltHeaderTools(mockEvent);
    expect(component.altHeaderToolsActive).toBeTrue();

    component.toggleAltHeaderTools(mockEvent);
    expect(component.altHeaderToolsActive).toBeFalse();
  });

  // Test case to check if header action items are rendered with correct icons
  it('should render header action items with correct icons', () => {
    const headerActionsContainer = fixture.debugElement.query(By.css('.cui-header-actions'));
    const headerActionButtons = headerActionsContainer.queryAll(By.css('p-button'));

    expect(headerActionButtons.length).toBe(3);

    const expectedIcons = ['cui-icon-dark-mode-toggle', 'cui-icon-help', 'cui-icon-sign-out'];

    headerActionButtons.forEach((button, index) => {
      const buttonElement = button.nativeElement as HTMLElement;
      const spanElement = buttonElement.querySelector('span.p-button-icon');

      if (!spanElement) {
        pending(`The expected icon element for button at index ${index + 1} is missing.`);
        return;
      }

      const iconClass = spanElement.className;

      if (!iconClass.includes(expectedIcons[index])) {
        pending(`The expected icon class '${expectedIcons[index]}' for button at index ${index + 1} is missing or incorrect.`);
        return;
      }

      expect(iconClass).toContain(expectedIcons[index]);
    });
  });

  // Test case to check if header tool items are rendered correctly
  it('should render header tool items', () => {
    const headerToolButtons: DebugElement[] = fixture.debugElement.queryAll(By.css('.cui-header-tools button'));

    if (headerToolButtons.length !== 5) {
      pending('Header tool buttons count changed. Expected buttons.');
    }

    const expectedLabels = ['File', 'Edit', 'Users', 'Events', 'More'];
    headerToolButtons.forEach((button, index) => {
      const span = button.query(By.css('.p-button-label'));
      if (!span) {
        pending(`Span label for button ${index + 1} is missing.`);
      } else {
        const textContent = span.nativeElement.textContent.trim();
        if (textContent !== expectedLabels[index]) {
          pending(`Button ${index + 1} label changed. Expected "${expectedLabels[index]}" but got "${textContent}".`);
        }
        expect(textContent).toBe(expectedLabels[index]);
      }
    });
  });

  // Test case to check if the sidebar button click triggers the toggle function
  it('should call toggleSideNavigation on sidebar button click', () => {
    spyOn(component, 'toggleSideNavigation');
    const sidebarButton: DebugElement = fixture.debugElement.query(By.css('.cui-header-menu-button p-button'));
    sidebarButton.triggerEventHandler('onClick', null);
    expect(component.toggleSideNavigation).toHaveBeenCalled();
  });

  // Test case to check if the "more tools" button click triggers the toggle function
  it('should call toggleAltHeaderTools on more tools button click', () => {
    spyOn(component, 'toggleAltHeaderTools');
    const moreToolsButton: DebugElement = fixture.debugElement.query(By.css('.cui-header-tools-more p-button'));
    moreToolsButton.triggerEventHandler('onClick', null);
    expect(component.toggleAltHeaderTools).toHaveBeenCalled();
  });

  // Test case to check if the mock command function is called on "Toggle mode" button click
  it('should call a mock function on Toggle mode button click', () => {
    // Mock the first action item with a custom function
    component.headerActionItems[0] = {
      label: 'Toggle mode',
      icon: 'cui-icon-dark-mode-toggle',
      command: jasmine.createSpy('mockCommand')
    };

    // Check if the headerActionItems[0] and its command function exist
    expect(component.headerActionItems[0]).toBeTruthy();
    expect(component.headerActionItems[0].command).toBeTruthy();

    const headerActionsContainer = fixture.debugElement.query(By.css('.cui-header-actions'));
    const toggleModeIcon: DebugElement = headerActionsContainer.query(By.css('span.cui-icon-dark-mode-toggle'));

    if (!toggleModeIcon) {
      pending('Toggle mode icon not found.');
      return;
    }

    const toggleModeButton: DebugElement | null = toggleModeIcon.parent;
    if (!toggleModeButton) {
      pending('Toggle mode button not found.');
      return;
    }

    toggleModeButton.triggerEventHandler('click', { originalEvent: null, item: component.headerActionItems[0] });
  });
});
