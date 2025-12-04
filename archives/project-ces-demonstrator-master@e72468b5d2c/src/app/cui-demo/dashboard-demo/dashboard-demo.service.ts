import { Injectable } from '@angular/core';

@Injectable()
export class DashBoardDemoService {
    getProductsData() {
        return [
            {
                id: '1000',
                code: 'f230fh0g3',
                name: 'Product label',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'Ready',
                rating: 5
            },
            {
                id: '1001',
                code: 'nvklal433',
                name: 'Product label',
                description: 'Product Description',
                image: 'black-watch.jpg',
                price: 72,
                category: 'Accessories',
                quantity: 61,
                inventoryStatus: 'Ready',
                rating: 4
            },
            {
                id: '1002',
                code: 'zz21cz3c1',
                name: 'Product label',
                description: 'Product Description',
                image: 'blue-band.jpg',
                price: 79,
                category: 'Fitness',
                quantity: 2,
                inventoryStatus: 'Pending',
                rating: 3
            },
            {
                id: '1003',
                code: '244wgerg2',
                name: 'Product label',
                description: 'Product Description',
                image: 'blue-t-shirt.jpg',
                price: 29,
                category: 'Clothing',
                quantity: 25,
                inventoryStatus: 'Ready',
                rating: 5
            },
            {
                id: '1004',
                code: 'h456wer53',
                name: 'Product label',
                description: 'Product Description',
                image: 'bracelet.jpg',
                price: 15,
                category: 'Accessories',
                quantity: 73,
                inventoryStatus: 'Pending',
                rating: 4
            },
            {
                id: '1005',
                code: 'av2231fwg',
                name: 'Product label',
                description: 'Product Description',
                image: 'brown-purse.jpg',
                price: 120,
                category: 'Accessories',
                quantity: 0,
                inventoryStatus: 'Pending',
                rating: 4
            },
            {
                id: '1006',
                code: 'bib36pfvm',
                name: 'Product label',
                description: 'Product Description',
                image: 'chakra-bracelet.jpg',
                price: 32,
                category: 'Accessories',
                quantity: 5,
                inventoryStatus: 'Ready',
                rating: 3
            },
            {
                id: '1007',
                code: 'mbvjkgip5',
                name: 'Product label',
                description: 'Product Description',
                image: 'galaxy-earrings.jpg',
                price: 34,
                category: 'Accessories',
                quantity: 23,
                inventoryStatus: 'Pending',
                rating: 5
            },
            {
                id: '1008',
                code: 'vbb124btr',
                name: 'Product label',
                description: 'Product Description',
                image: 'game-controller.jpg',
                price: 99,
                category: 'Electronics',
                quantity: 2,
                inventoryStatus: 'Pending',
                rating: 4
            }
        ];
    }

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 8));
    }
}
