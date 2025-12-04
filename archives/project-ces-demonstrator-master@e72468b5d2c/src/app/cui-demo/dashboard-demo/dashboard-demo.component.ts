import { Component, OnInit } from '@angular/core';
import * as chartjs from 'chart.js';
import { DashBoardDemoService } from './dashboard-demo.service';
import { DashboardProduct } from './dashdoard-products';
import { UiLibraryModule } from 'src/app/cui/shared/ui-library/ui-library.module';
import { CommonModule } from '@angular/common';
interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-dashboard-demo',
    templateUrl: './dashboard-demo.component.html',
    standalone: true,
    imports: [UiLibraryModule, CommonModule],
    providers: [DashBoardDemoService]
})
export class DashboardDemoComponent implements OnInit {

    statistics = [
        {
            icon: 'cui-icon-arrow-up-right',
            value: '+25',
            title: 'Revenue',
            description: 'Total revenue'
        },
        {
            icon: 'cui-icon-arrow-right',
            value: '+0.8',
            title: 'Support',
            description: 'Customer satisfaction'
        },
        {
            icon: 'cui-icon-arrow-down-right',
            value: '-10',
            title: 'Costs',
            description: 'Total costs'
        },
        {
            icon: 'cui-icon-arrow-up-right',
            value: '+15',
            title: 'Productivity',
            description: 'Production level'
        }
    ];


    products!: DashboardProduct[];

    cols!: Column[];


    public chartData!: chartjs.ChartData<'bar'>;
    public chartOptions!: chartjs.ChartOptions<'bar'>;

    public doughnutChartData!: chartjs.ChartData<'doughnut'>;
    public doughnutChartOptions!: chartjs.ChartOptions<'doughnut'>;

    constructor(private dashboardService: DashBoardDemoService) { }

    ngOnInit() {

        this.dashboardService.getProductsMini().then((data) => {
            this.products = data
        })

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'inventoryStatus', header: 'Status' },
        ];


        const documentStyle = getComputedStyle(document.documentElement);

        this.chartData = {
            labels: ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4'],
            datasets: [
                {
                    label: '',
                    data: [15, 49, 59, 8],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--chart-color1'),
                        documentStyle.getPropertyValue('--chart-color3'),
                        documentStyle.getPropertyValue('--chart-color4'),
                        documentStyle.getPropertyValue('--chart-color5'),

                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--chart-color1-hover'),
                        documentStyle.getPropertyValue('--chart-color3-hover'),
                        documentStyle.getPropertyValue('--chart-color4-hover'),
                        documentStyle.getPropertyValue('--chart-color5-hover'),
                    ],
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8
                    },
                    barThickness: 40,
                    maxBarThickness: 45
                }
            ]
        };

        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 560,
                        color: documentStyle.getPropertyValue('--chart-label-color'),
                        font: {
                            size: 0
                        }
                    }
                },
                tooltip: {
                    backgroundColor: documentStyle.getPropertyValue('--core-gray-900'),
                    bodyColor: documentStyle.getPropertyValue('--core-surface-0'),
                    boxHeight: 20,
                    padding: { top: 8, right: 16, bottom: 8, left: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks:
                    {
                        color: documentStyle.getPropertyValue('--chart-label-color')
                    },
                    grid: {
                        color: documentStyle.getPropertyValue('--chart-grid-color')
                    }
                },
                x: {
                    ticks: {
                        color: documentStyle.getPropertyValue('--chart-label-color')
                    },
                    grid: {
                        display: false,
                        color: documentStyle.getPropertyValue('--chart-grid-color')
                    }
                }
            },
        };

        this.doughnutChartData = {
            labels: ['Category A', 'Category B', 'Category C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--chart-color1'),
                        documentStyle.getPropertyValue('--chart-color4'),
                        documentStyle.getPropertyValue('--chart-color3'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--chart-color1-hover'),
                        documentStyle.getPropertyValue('--chart-color4-hover'),
                        documentStyle.getPropertyValue('--chart-color3-hover'),
                    ],
                    borderWidth: 0
                }
            ]
        };

        this.doughnutChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        color: documentStyle.getPropertyValue('--chart-label-color'),
                        font: {
                            size: 14
                        },
                        padding: 50, // Add padding between the legend items
                        boxWidth: 20, // Adjust box size for the point/rectangle
                        boxHeight: 30 // Adjust the box height (for point styles)
                    },
                    align: 'center', // 'start', 'end', or 'center' alignment of the legend
                    maxHeight: 200,
                },
                tooltip: {
                    backgroundColor: documentStyle.getPropertyValue('--core-gray-900'),
                    bodyColor: documentStyle.getPropertyValue('--core-surface-0')
                }
            },
            cutout: '70%',
            layout: {
                padding: {
                    top: 10, // Adds margin between the chart area and the top edge
                    bottom: 0, // Adds margin between the chart area and the bottom edge (including the legend)
                    left: 10, // Adds margin on the left side of the chart
                    right: 10 // Adds margin on the right side of the chart
                }
            }
        };
    }

    getSeverity(status: string | undefined): any {
        switch (status) {
            case 'Ready':
              return 'info';
            default:
              return null;
          }
    }
}
