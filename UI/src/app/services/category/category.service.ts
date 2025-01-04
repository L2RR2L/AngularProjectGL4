import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    categories = ['music', 'sports', 'gaming', 'movies', 'news', 'live'];

    getCategories(): string[] {
        return this.categories;
    }

    getCategoryIndex(category: string): number {
        return this.categories.indexOf(category);
    }
}
