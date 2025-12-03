import { TestBed } from '@angular/core/testing';

import { CuiHeaderActionItemsService } from './cui-header-action-items.service';
import { CuiHeaderActionItems } from 'src/app/cui-header-action-items';
import { MenuItem } from 'primeng/api';

describe('CuiHeaderActionItemsService', () => {
  let service: CuiHeaderActionItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuiHeaderActionItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize headerActionItems from CuiHeaderActionItems', () => {
    expect(service.headerActionItems).toEqual(CuiHeaderActionItems);
  });

  it('should return headerActionItems from getItems method', () => {
    const boundObject = {}; // replace with actual bound object if needed
    const items: MenuItem[] = service.getItems(boundObject);
    expect(items).toEqual(CuiHeaderActionItems);
  });
});
