import { TestBed } from '@angular/core/testing';

import { CuiHeaderToolsService } from './cui-header-tools.service';
import { CuiHeaderActionItems } from 'src/app/cui-header-action-items';
import { CuiHeaderToolItems } from 'src/app/cui-header-tools-items';
import { MenuItem } from 'primeng/api';

describe('CuiHeaderToolsService', () => {
  let service: CuiHeaderToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuiHeaderToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize headerToolItems from CuiHeaderToolItems', () => {
    // Test to check that the service initializes the headerToolItems property
    // with the values from CuiHeaderToolItems
    expect(service.headerToolItems).toEqual(CuiHeaderToolItems);
  });

  it('should return headerToolItems from getItems method', () => {
    // Test to verify that the getItems method returns the correct header tool items
    // It should return the items from CuiHeaderToolItems
    const items: MenuItem[] = service.getItems();
    expect(items).toEqual(CuiHeaderToolItems);
  });
  
});
