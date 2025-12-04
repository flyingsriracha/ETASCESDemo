import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CuiHeaderToolItems } from 'src/app/cui-header-tools-items';

/**
 * Service to manage header tool items.
 * 
 * The `CuiHeaderToolsService` provides methods to access and manage
 * the tool items displayed in the application's header. It initializes
 * with a predefined set of optional header tool items and allows retrieval of these items.
 *
 * @service
 * @providedIn root
 */
@Injectable({
  providedIn: 'root'
})

export class CuiHeaderToolsService {

  /**
   * The list of header tool items.
   * @type {MenuItem[]}
   */
  headerToolItems: MenuItem[];

  /**
   * Creates an instance of CuiHeaderToolsService.
   * 
   * Initializes the `headerToolItems` with predefined items from `CuiHeaderToolItems`.
   */
  constructor() {
    this.headerToolItems = CuiHeaderToolItems
  }

  /**
   * Retrieves the header tool items.
   * 
   * @returns {MenuItem[]} The list of header tool items.
   */
  getItems(): MenuItem[] {
    return this.headerToolItems;
  }
}
