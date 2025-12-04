import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { sideNavigationOpenCSSClass } from '../shared/cui-constants';
import { CuiSideNavigationService } from '../cui-side-navigation/cui-side-navigation.service';
import { CuiHeaderToolsService } from './cui-header-tools.service';
import { CuiThemeService } from '../cui-theme/cui-theme.service';
import { CuiHeaderActionItemsService } from './cui-header-action-items.service';
import { CuiApplicationName } from 'src/app/cui-settings';

/**
 * Component representing the application header.
 *
 * The `CuiHeaderComponent` is responsible for displaying the header of the application,
 * which includes the application name, header tools, and header action items. It also 
 * provides functionality to toggle side navigation and theme mode.
 *
 * @component
 * @selector cui-header
 * @templateUrl ./cui-header.component.html
 */
@Component({
  selector: 'cui-header',
  templateUrl: './cui-header.component.html'
})

export class CuiHeaderComponent implements OnInit {
  /**
   * The name is displayed in the application's GUI header.
   */
  applicationName: string = CuiApplicationName;

  /**
 * CSS class to indicate whether the side navigation is open.
 * @type {string}
 */
  openClass: string = sideNavigationOpenCSSClass;

  /**
   * Indicates whether the sidebar button should be shown.
   * Set this property to true to display the sidebar button, or false to hide it.
   * This property can be configured by the developer to control the visibility of the sidebar button.
   * @type {boolean}
   */
  showSidebarButton: boolean = true;

  /**
   * Indicates whether the alternative header tools menu is active.
   * Set this property to true to activate the alternative menu for displaying header tools
   * on smaller viewports, where a "more" button consolidates the tools into a single menu.
   * @type {boolean}
   */
  altHeaderToolsActive: boolean = false;

/**
 * Indicates whether the alternative action menu is active.
 * Set this property to true to activate the alternative menu for grouping icons
 * on the right side of the header into a dropdown menu, accessible by clicking
 * on a 'three dots vertical' icon, especially on smaller viewports.
 * @type {boolean}
 */
  altActionMenuActive: boolean = false;

  /**
   * List of header tool items.
   * @type {MenuItem[]}
   */
  headerToolItems: MenuItem[] = [];

  /**
   * List of header action items.
   * @type {MenuItem[]}
   */
  headerActionItems: MenuItem[] = [];

  /**
   * Creates an instance of CuiHeaderComponent.
   * 
   * @param {CuiSideNavigationService} sideNavigation - Service for managing side navigation.
   * @param {CuiHeaderToolsService} headerTools - Service for managing header tool items.
   * @param {CuiThemeService} theme - Service for managing theme mode.
   * @param {CuiHeaderActionItemsService} actionItems - Service for managing header action items.
   */
  constructor(
    private sideNavigation: CuiSideNavigationService,
    private headerTools: CuiHeaderToolsService,
    private theme: CuiThemeService,
    private actionItems: CuiHeaderActionItemsService
  ) { }

  /**
   * Initializes the component by setting header tool and action items,
   * and determining if the sidebar button should be shown.
   */
  ngOnInit(): void {
    this.headerToolItems = this.headerTools.getItems();
    this.headerActionItems = (this.actionItems.getItems(this));
    this.showSidebarButton = this.sideNavigation.hasSideNavigation();
  }

  /**
   * Toggles the side navigation when the "hamburger" icon is clicked.
   * 
   * @param {Event} ev - The click event.
   */
  toggleSideNavigation(ev: Event): void {
    this.sideNavigation.toggle(ev);
  }

  /**
   * Toggles the light/dark mode when the toggle icon is clicked.
   * 
   * @param {Event} ev - The click event.
   */
  toggleMode(ev: Event): void {
    ev.stopPropagation();
    (ev.currentTarget as HTMLElement).blur();

    this.theme.toggleMode();
  }

  /**
   * Toggles the alternative header tools menu on smaller viewports.
   * 
   * @param {Event} ev - The click event.
   */
  toggleAltHeaderTools(ev: Event) {
    if (this.altHeaderToolsActive === false) {
      this.altHeaderToolsActive = true;
      this.altActionMenuActive = false;   // hide action items menu
    } else {
      this.altHeaderToolsActive = false;
    }
    (ev.currentTarget as HTMLElement).blur();
  }

  /**
   * Toggles the alternative action menu for small viewports.
   * 
   * @param {Event} ev - The click event.
   */
  toggleAltActionMenu(ev: Event) {
    if (this.altActionMenuActive === false) {
      this.altActionMenuActive = true;
      this.altHeaderToolsActive = false;  // hide header tools menu
    } else {
      this.altActionMenuActive = false;
    }

    (ev.currentTarget as HTMLElement).blur();
  }
}
