import { Component, ElementRef, OnInit } from '@angular/core';
import {
  LibraryService,
  LibraryState,
} from '../../services/side-nav-options/library/library.service';
import { Store } from '@ngrx/store';
import { Observable, switchMap, map, startWith, catchError, of } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';
import { SignInButtonComponent } from '../../layout/top-nav/end-nav/sign-in-button/sign-in-button.component';
import { AsyncPipe } from '@angular/common';
import { Library } from '../../types/library';
import { LibraryComponent } from '../../components/library/library.component';
import { Router } from '@angular/router';
import { CreateLibraryModalComponent } from '../../components/create-library-modal/create-library-modal.component';

@Component({
  selector: 'app-library-page',
  standalone: true,
  imports: [
    SignInButtonComponent,
    AsyncPipe,
    LibraryComponent,
    CreateLibraryModalComponent,
  ],
  templateUrl: './library-page.component.html',
  styleUrl: './library-page.component.css',
})
export class LibraryPageComponent implements OnInit {
  state$: Observable<LibraryState>;
  libraries: Library[] = [];
  showModal: boolean = false;

  constructor(
    private store: Store<AppState>,
    private libraryService: LibraryService,
    private elRef: ElementRef,
    private router: Router
  ) {
    this.state$ = this.store.select(selectIsAuthenticated).pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return of({
            type: 'authenticated' as const,
          });
        } else {
          return of({
            type: 'notAuthenticated' as const,
            option: this.libraryService.getSideNavOption(),
          });
        }
      })
    );
  }

  ngOnInit(): void {
    this.store
      .select(selectIsAuthenticated)
      .pipe(
        switchMap((isAuthenticated) => {
          if (isAuthenticated) {
            return this.libraryService.getLibraries();
          } else {
            return of(null);
          }
        }),
        catchError((error) => {
          console.error('An error occurred while fetching libraries:', error);
          return of(null);
        })
      )
      .subscribe((libraries) => {
        if (libraries) {
          this.libraries = libraries;
        }
      });
    this.elRef.nativeElement.addEventListener(
      'click',
      this.onLibraryClick.bind(this)
    );
  }

  onLibraryClick(event: Event) {
    const target = event.target as HTMLElement;
    const libraryElement = target.closest('[data-library-id]') as HTMLElement;
    const deleteElement = target.closest(
      '[data-library-id-delete]'
    ) as HTMLElement;

    if (deleteElement) {
      const libraryId = deleteElement.getAttribute('data-library-id-delete');
      this.libraryService.deleteLibrary(libraryId).subscribe(() => {
        this.libraries = this.libraries.filter(
          (library) => library._id !== libraryId
        );
      });
    } else if (libraryElement) {
      const libraryId = libraryElement.getAttribute('data-library-id');
      const library = this.libraries.find(
        (library) => library._id === libraryId
      );
      if (library) {
        this.router.navigate(['/library', library._id]);
      }
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createLibrary(libraryName: string) {
    this.libraryService.createLibrary(libraryName).subscribe((library) => {
      this.libraries.push(library);
    });
    this.closeModal();
  }
}
