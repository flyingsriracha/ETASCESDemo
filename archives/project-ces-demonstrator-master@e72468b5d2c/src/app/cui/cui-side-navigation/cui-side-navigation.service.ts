import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SideNavigationItem } from './cui-side-navigation-item.interface';
import { noSideNavigationCSSClass, sideNavigationCSSClass, sideNavigationOpenCSSClass, sideNavigationPinCSSClass } from '../shared/cui-constants';
import { CuiSideNavigationItems } from '../../cui-side-navigation-items';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service for managing side navigation items and state.
 *
 * The `CuiSideNavigationService` handles the display and interaction with the side navigation menu,
 * including initializing navigation items, reacting to route changes, and managing the open/close state of the menu.
 */
@Injectable({
  providedIn: 'root'
})
export class CuiSideNavigationService {

  /** The list of side navigation items displayed in the application's side navigation menu. */
  sideNavigationItems: SideNavigationItem[] = [];

  /** The CSS class applied to the side navigation container element. */
  sideNavigationClass = sideNavigationCSSClass;

  /** The CSS class applied to the <body> tag when the side navigation is pinned. */
  pinnedClass = sideNavigationPinCSSClass;

  /** The CSS class applied to the <body> tag when the side navigation is opened. */
  openedClass = sideNavigationOpenCSSClass;

  /** The current route of the application. */
  currentRoute = '';

  /** A cache storing the path of the currently selected navigation item. */
  itemCache: SideNavigationItem[] = [];

  /** A flag indicating whether the currently selected navigation item was found. */
  foundItem: boolean = false;

  /** A subject used to emit side navigation items for observation by subscribers. */
  itemSubject: BehaviorSubject<SideNavigationItem[]>;

  /**
   * Creates an instance of `CuiSideNavigationService`.
   * 
   * @param {Router} router - The router service to listen to route changes.
   */
  constructor(
    private router: Router
  ) {
    this.sideNavigationItems = CuiSideNavigationItems;
    this.itemSubject = new BehaviorSubject(this.sideNavigationItems);

    this.initSideNavigation();
  }

  /**
   * Initializes the side navigation.
   * 
   * Determines whether to activate or deactivate the side navigation based on the presence of navigation items.
   * If navigation items exist, it enables the side navigation and sets up necessary event listeners and route handling.
   * If no navigation items are provided, the side navigation is disabled.
   */
  initSideNavigation(): void {
    if (!this.hasSideNavigation()) {
      this.disable();
    } else {
      this.enable();
      this.initRouting();
      this.initCloseOnClickOutside();
    }
  }

  /**
   * Disables the side navigation by adding a CSS class to the body tag.
   * 
   * This happens when there are no side navigation items provided.
   */
  disable(): void {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    body.classList.add(noSideNavigationCSSClass);
  }

  /**
   * Enables the side navigation by removing a CSS class from the body tag.
   */
  enable(): void {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    body.classList.remove(noSideNavigationCSSClass);
  }

  /**
   * Subscribes to the router's NavigationEnd event to handle route changes.
   */
  private initRouting(): void {
    this.router.events.pipe(
      filter((event => event instanceof NavigationEnd))
    ).subscribe((navigationEnd) => {
      this.handleActivatedRoute((navigationEnd as NavigationEnd));
    })
  }

  /**
   * Initializes the navigation items by setting the `current` property based on the current route.
   * 
   * @param {SideNavigationItem[]} items - The navigation items to initialize.
   */
  private initItems(items: SideNavigationItem[]): void {
    items.forEach((item: SideNavigationItem) => {
      if (item.route === this.currentRoute) {
        item.current = true;
      } else {
        item.current = false;
      }

      if (item.children) {
        this.initItems(item.children);
      }
    });
  }

  /**
   * Sets up an event listener to close the side navigation on click outside.
   */
  initCloseOnClickOutside(): void {
    const body = document.querySelector('body');

    if (body) {
      body.addEventListener('click', (ev) => {
        if (!this.isClickInsideNavigation(ev)) {
          this.close();
        }
      });
    }
  }

  /**
   * Handles the activated route by updating the current route and initializing navigation items.
   * 
   * @param {NavigationEnd} navigationEnd - The NavigationEnd event.
   */
  handleActivatedRoute(navigationEnd: NavigationEnd): void {
    this.currentRoute = navigationEnd.urlAfterRedirects;
    this.initItems(this.sideNavigationItems);
  }

  /**
   * Toggles the side navigation open or closed.
   * 
   * @param {Event} event - The event that triggered the toggle.
   */
  toggle(event: Event): void {
    event.stopPropagation();
    (event.currentTarget as HTMLElement).blur();

    const body = document.querySelector('body');
    if (!body) return;

    if (body.classList.contains(this.openedClass)) {
      this.close();
    } else {
      this.open();
    }
  }


  /**
   * Toggles the pinned state of the side navigation.
   *
   * @param {Event} event - The event that triggered the pin toggle.
   */
  togglePin(event: Event): void {
    const body = document.querySelector('body');
    if (!body) return;

    const wasPinned = body.classList.contains(this.pinnedClass);
    body.classList.toggle(this.pinnedClass);

    // If just unpinned then need to close
    if (!wasPinned) {
      this.close();
    }
  }

  /**
   * Closes the side navigation by removing a CSS class from the body tag.
   */
  close(): void {
    const body = document.querySelector('body');
    if (!body) return;

    body.classList.remove(this.openedClass);
    this.closeAllSubItems(this.sideNavigationItems);
    this.itemSubject.next(this.sideNavigationItems);
  }


  /**
   * Opens the side navigation by adding a CSS class to the body tag. Visibility and effect is defined in CSS
   */
  open(): void {
    const body = document.querySelector('body');

    if (body && !body.classList.contains(this.openedClass)) {
      body.classList.add(this.openedClass);
      this.openSelectedItem();
      this.itemSubject.next(this.sideNavigationItems);
    }
  }

  /**
   * Toggles (opens/closes) a node in the navigation menu.
   * 
   * @param {Event} event - The event that triggered the toggle.
   * @param {SideNavigationItem} sideNavigationItem - The navigation item to toggle.
   */
  toggleItems(event: Event, sideNavigationItem: SideNavigationItem): void {
    (event.currentTarget as HTMLElement).blur();
    sideNavigationItem.childrenOpen = !sideNavigationItem.childrenOpen;
  }

  /**
   * Closes all submenus by setting `childrenOpen` to false recursively.
   * 
   * @param {SideNavigationItem[]} sideNavigationItems - The navigation items to close.
   */
  closeAllSubItems(sideNavigationItems: SideNavigationItem[]): void {
    for (let i = 0; i < sideNavigationItems.length; i++) {
      const sideNavigationItem = sideNavigationItems[i];
      if (sideNavigationItem.children) {
        sideNavigationItem.childrenOpen = false;
        sideNavigationItem.current = false;
        this.closeAllSubItems(sideNavigationItem.children);
      }
    }
  }

  /**
   * Opens the path to the selected navigation item.
   */
  openSelectedItem(): void {
    this.itemCache = [];
    this.foundItem = false;
    this.findCurrentItemInObject(this.sideNavigationItems);
    for (let i = 0; i < this.itemCache.length - 1; i++) {
      this.itemCache[i].childrenOpen = true;
    }
  }

  /**
   * Finds the current navigation item based on the current route and stores the path in `itemCache`.
   * 
   * @param {SideNavigationItem[]} items - The navigation items to search.
   */
  findCurrentItemInObject(items: SideNavigationItem[]): void {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      this.itemCache.push(item);

      if (item.route && item.route === this.currentRoute) {
        item.current = true;
        this.foundItem = true;
        break;
      } else if (item.children && Array.isArray(item.children) && item.children.length) {
        this.findCurrentItemInObject(item.children);
        if (this.foundItem) {
          break;
        }
      }
      this.itemCache.pop();
    };
  }

  /**
   * Checks if a click event happened inside the side navigation.
   * 
   * @param {MouseEvent} event - The click event.
   * @returns {boolean} - `true` if the click happened inside the navigation, `false` otherwise.
   */
  isClickInsideNavigation(event: MouseEvent): boolean {
    const target = event.target as HTMLElement;
    const navigationContainer = document.querySelector(`.${this.sideNavigationClass}`);

    if (
      navigationContainer
      && (target.classList.contains(this.sideNavigationClass) || target.closest(`.${this.sideNavigationClass}`))
    ) {
      return true
    }
    return false;
  }

  /**
   * Gets the side navigation items as an observable.
   * 
   * @returns {Observable<SideNavigationItem[]>} - Observable of side navigation items.
   */
  getItems(): Observable<SideNavigationItem[]> {
    return this.itemSubject.asObservable();
  }

  /**
  * Checks if side navigation items are defined.
  * 
  * @returns {boolean} - `true` if side navigation items are defined, `false` otherwise.
  */
  hasSideNavigation(): boolean {
    return (this.sideNavigationItems.length as unknown as boolean);
  }

}
