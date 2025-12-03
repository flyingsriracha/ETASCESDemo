import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CuiHeaderActionItems } from 'src/app/cui-header-action-items';

/**
 * Service to managing header action items.
 * 
 * The `CuiHeaderActionItemsService` provides methods to access and manage
 * the action items displayed in the application's header. It initializes
 * with a predefined set of header action items and allows retrieval of these items.
 *
 * @service
 * @providedIn root
 */
@Injectable({
  providedIn: 'root'
})
export class CuiHeaderActionItemsService {

  /**
   * The list of header action items.
   * @type {MenuItem[]}
   */
  headerActionItems: MenuItem[];

  /**
   * Creates an instance of CuiHeaderActionItemsService.
   * 
   * Initializes the `headerActionItems` with predefined items from `CuiHeaderActionItems`.
   */
  constructor() {
    this.headerActionItems = CuiHeaderActionItems
  }
  
  /**
   * Retrieves the header action items.
   * 
   * @param {any} bound - The binding context for the header action items.
   * @returns {MenuItem[]} The list of header action items.
   */
  getItems(bound:any): MenuItem[] {
    return this.headerActionItems;
  }
}
