import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CuiSideNavigationItems } from '../../cui-side-navigation-items';
import { SideNavigationItem } from './cui-side-navigation-item.interface';
import { sideNavigationCSSClass, sideNavigationOpenCSSClass, sideNavigationPinCSSClass } from '../shared/cui-constants';
import { CuiSideNavigationService } from './cui-side-navigation.service';
import { tooltipShowDelay } from '../../cui/shared/cui-constants';
import { tooltipHideDelay } from '../../cui/shared/cui-constants';


/**
 * Component representing the side navigation menu.
 *
 * The `CuiSideNavigationComponent` manages the display and interaction with the
 * side navigation menu, including pinning, opening, and closing the menu, and toggling
 * the visibility of navigation items.
 *
 * @component
 * @selector cui-side-navigation
 * @templateUrl ./cui-side-navigation.component.html
 * @styleUrls []
 */
@Component({
  selector: 'cui-side-navigation',
  templateUrl: './cui-side-navigation.component.html',
  styleUrls: []
})

export class CuiSideNavigationComponent implements OnInit {

  /**
 * List of side navigation items.
 * @type {SideNavigationItem[]}
 */
  sideNavigationItems: SideNavigationItem[] = [];

  /**
   * CSS class for side navigation.
   * @type {string}
   */
  sideNavigationClass = sideNavigationCSSClass;

  /**
   * CSS class for pinned side navigation.
   * @type {string}
   */
  pinnedClass = sideNavigationPinCSSClass;

  /**
   * CSS class for opened side navigation.
   * @type {string}
   */
  openedClass = sideNavigationOpenCSSClass;

  /**
   * The current route.
   * @type {string}
   */
  currentRoute = '';

  /**
   * Delay for showing tooltips.
   * @type {number}
   */
  tooltipShowDelay = tooltipShowDelay;

  /**
   * Delay for hiding tooltips.
   * @type {number}
   */
  tooltipHideDelay = tooltipHideDelay;

  /**
   * Cache for the currently selected item path.
   * @type {SideNavigationItem[]}
   */
  itemCache: SideNavigationItem[] = [];    // used to cache an item path to the currently selected item when the sidebar is reopened

  /**
   * Flag indicating if the currently selected item was found.
   * @type {boolean}
   */
  foundItem: boolean = false;       // flag, used at the search for the currently selected item

  /**
   * Creates an instance of CuiSideNavigationComponent.
   * 
   * @param {CuiSideNavigationService} sideNavigation - Service for managing side navigation items and state.
   */
  constructor(
    private sideNavigation: CuiSideNavigationService
  ) { }

  /**
   * Toggles the pinned state of the side navigation.
   * 
   * The side navigation can be pinned so that it remains open even if an item is clicked. 
   * To pin or unpin the side navigation, a CSS class is added or removed from the body tag.
   * When unpinned, the sidebar and all open submenus automatically close.
   *
   * @param {Event} event - The click event.
   */
  ngOnInit(): void {
    this.sideNavigation.getItems().subscribe((items) => {
      this.sideNavigationItems = items;
    });
  }

  /**
   * Toggles the pinned state of the side navigation.
   * 
   * The side navigation can be pinned so that it remains open even if an item is clicked. 
   * To pin or unpin the side navigation, a CSS class is added or removed from the body tag.
   * When unpinned, the sidebar and all open submenus automatically close.
   *
   * @param {Event} event - The click event.
   */
  toggleSideNavigationPin(event: Event): void {
    this.sideNavigation.togglePin(event);
  }

  /**
   * Closes the side navigation by removing a CSS class from the body tag.
   */
  closeSideNavigation(): void {
    this.sideNavigation.close();
  }

  /**
   * Opens the side navigation by adding a CSS class to the body tag.
   * Visibility and effect are defined in CSS.
   */
  openSideNavigation(): void {
    this.sideNavigation.open();
  }

  /**
   * Toggles (opens/closes) a node in the navigation menu.
   * 
   * @param {Event} event - The click event.
   * @param {SideNavigationItem} sideNavigationItem - The navigation item to toggle.
   */
  toggleSideNavigationItems(event: Event, sideNavigationItem: SideNavigationItem): void {
    this.sideNavigation.toggleItems(event, sideNavigationItem);
  }
}
