import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { TableOverviewProductService } from './table-overview-products.service';
import { TableOverviewProduct } from './table-overview-products';
import { Table, TableHeaderCheckbox } from 'primeng/table';

interface Options {
  name: string;
  code: string;
}

@Component({
  selector: 'app-table-overview',
  templateUrl: './table-overview.component.html',
  providers: [MessageService, ConfirmationService, TableOverviewProductService],
})
export class TableOverviewComponent implements OnInit, AfterViewInit {

  products!: TableOverviewProduct[];

  selectedProducts: TableOverviewProduct[] = [];

  rows = 5;

  statuses!: any[];
  totalRecords: any;

  items: MenuItem[] | undefined;

  visible: boolean = false;

  options1: Options[] | undefined;

  options2: Options[] | undefined;

  selectedOption1: Options | undefined;

  selectedOption2: Options | undefined;

  @ViewChild('headerCheckboxBox', { static: false }) headerCheckboxBox!: TableHeaderCheckbox;
  @ViewChild('dt') dt!: Table;
  searchKeyword: string = '';
  loading: boolean = false;
  searchValue: string = '';
  PRODUCT_DATA: TableOverviewProduct[] = [];

  /**
   * Initializes the TableOverviewComponent with necessary services.
   * @param tableOverviewProductService Service for managing table overview product data.
   */
  constructor(private tableOverviewProductService: TableOverviewProductService,
  ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized the component's data-bound properties.
   * Loads the product data and initializes UI elements like menu items and options.
   */
  ngOnInit(): void {
    this.tableOverviewProductService.getProducts().then((data) => {
      this.PRODUCT_DATA = [...data];
      this.products = data;
      this.updateHeaderCheckboxIndeterminateState();
    });

    this.items = [
      {
        label: 'Import',
        icon: 'cui-icon-download-simple'
      },
      {
        label: 'Export',
        icon: 'cui-icon-upload-simple'
      },
    ];

    this.options1 = [
      { name: 'Option 1', code: 'op1' },
      { name: 'Option 2', code: 'op2' },
      { name: 'Option 3', code: 'op3' },
      { name: 'Option 4', code: 'op4' },
      { name: 'Option 5', code: 'op5' },
    ];

    this.options2 = [
      { name: 'Option 1', code: 'op1' },
      { name: 'Option 2', code: 'op2' },
      { name: 'Option 3', code: 'op3' },
      { name: 'Option 4', code: 'op4' },
      { name: 'Option 5', code: 'op5' },
    ];
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized the component's view.
   * Ensures the header checkbox indeterminate state is updated.
   */
  ngAfterViewInit(): void {
    this.updateHeaderCheckboxIndeterminateState();
  }

  /**
   * Handles changes to the selection of products in the table.
   * Updates the indeterminate state of the header checkbox.
   */
  onSelectionChange() {
    this.updateHeaderCheckboxIndeterminateState();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim().toLowerCase();

    this.loading = true;

    setTimeout(() => {
      this.products = !query
        ? [...this.PRODUCT_DATA]
        : this.PRODUCT_DATA.filter(product =>
            product.name?.toLowerCase().includes(query) ||
            product.manufacturingID?.toLowerCase().includes(query) ||
            product.producer?.toLowerCase().includes(query) ||
            product.serialNumber?.toLowerCase().includes(query) ||
            product.priority?.toLowerCase().includes(query)
          );

      this.loading = false;
    }, 300);
  }


  /**
   * Updates the indeterminate state of the header checkbox based on the number of selected products.
   * Adds or removes the 'p-indeterminate' class to/from the checkbox DOM element.
   */
  updateHeaderCheckboxIndeterminateState() {
    if (this.products && this.selectedProducts) {
      const totalCheckboxes = this.products.length;
      const selectedCount = this.selectedProducts.length;


      if (this.headerCheckboxBox) {
        if (selectedCount > 0 && selectedCount < totalCheckboxes) {
          const cdRef = (this.headerCheckboxBox as any).cd;
          if (cdRef && cdRef._cdRefInjectingView && Array.isArray(cdRef._cdRefInjectingView)) {
            const targetElement = cdRef._cdRefInjectingView[29];

            // Check if targetElement is a DOM element
            if (targetElement instanceof HTMLElement) {
              targetElement.classList.add('p-indeterminate');
            }
          }
        } else {
          // Assuming the element might need the class removed if conditions are not met
          const cdRef = (this.headerCheckboxBox as any).cd;
          if (cdRef && cdRef._cdRefInjectingView && Array.isArray(cdRef._cdRefInjectingView)) {
            const targetElement = cdRef._cdRefInjectingView[29];
            // Check if targetElement is a DOM element
            if (targetElement instanceof HTMLElement) {
              targetElement.classList.remove('p-indeterminate');
            }
          }
        }
      }
    }
  }

  /**
   * Determines the severity level for a given product status.
   * @param status The status of the product (e.g., 'Medium', 'High').
   * @returns The severity level as a string ('info', 'danger', or null).
   */
  getSeverity(status: string | undefined): any {
    switch (status) {
      case 'Medium':
        return 'info';
      case 'High':
        return 'danger';
      default:
        return null;
    }
  }

  /**
   * Displays a dialog box by setting the visibility state to true.
   */
  showDialog() {
    this.visible = true;
  }

}
