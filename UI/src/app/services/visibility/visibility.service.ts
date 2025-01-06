import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class VisibilityService {
    visibility = ["public", "unlisted", "private"];


    getVisibilityOptions(): string[] {
        return this.visibility;
    }

    getVisibilityIndex(category: string): number {
        return this.visibility.indexOf(category);
    }
}
