import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { read, setBaseUrl, CuiApiRequestConfig } from '../../cui/shared/api/apiClient';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];  // Array to hold car data
  loading: boolean = true;  // Loading state
  searchQuery: string = '';  // Search query for filtering cars
  rows: number = 5;
  // Base API URL
  private readonly API_BASE_URL = 'https://myfakeapi.com/api';

  ngOnInit(): void {
    setBaseUrl(this.API_BASE_URL);  // Set the base URL for API requests
    this.fetchCars();  // Fetch cars when the component is initialized
  }

  // Fetch all cars from the API
  async fetchCars(): Promise<void> {
    this.loading = true;
    const config: CuiApiRequestConfig = {};  // Optional API config (if needed)
    try {
      // Make API call to get all cars
      const response = await read<{ cars: Car[] }>('/cars', config);
      this.cars = response?.data?.cars || [];  // Set cars array to fetched data
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      this.loading = false;
    }
  }

  // Handle search functionality
  async handleSearch(): Promise<void> {
    if (!this.searchQuery.trim()) {
      await this.fetchCars();  // If search query is empty, fetch all cars
      return;
    }

    this.loading = true;
    try {
      const config: CuiApiRequestConfig = {};
      const response = await read<{ cars: Car[] }>('/cars', config);
      const filteredCars = response.data.cars.filter(car =>
          (car.car ?? '').toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (car.car_model ?? '').toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.cars = filteredCars;
  } catch (error) {
      console.error('Error searching cars:', error);
  } finally {
      this.loading = false;
  }
  }
}
