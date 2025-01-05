import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SideNavOption, SideNavOptionService } from '../../../types/side-nav-option';

@Injectable({
    providedIn: 'root',
})
export class LibraryService extends SideNavOptionService {
    libraryOption: SideNavOption;

    constructor(private sanitizer: DomSanitizer) {
        super();
        this.libraryOption = {
            svg: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" class="w-full h-full">
                      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path>
                    </svg>`),
            name: 'Library',
            path: '/library',
            notAuthenticatedTitle: 'Enjoy your favorite videos',
            notAuthenticatedSubtitle: 'Sign in to access videos you’ve liked and saved'
        };
    }

    override getSideNavOption(): SideNavOption {
        return this.libraryOption;
    }
}