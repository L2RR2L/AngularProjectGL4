import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { AsyncPipe, NgClass } from '@angular/common';
import { SideNavService } from '../../services/side-nav/side-nav.service';
import { SideNavOption } from '../../types/side-nav-option';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {
  isDrawerOpen$: Observable<boolean>;
  sideNavOptions: Array<SideNavOption>;
  activeOption: string;

  constructor(
    private store: Store<AppState>,
    private sideNavService: SideNavService,
    private router: Router
  ) {
    this.isDrawerOpen$ = this.store.select(
      (state) => state.layout.isDrawerOpen
    );
    this.sideNavOptions = this.sideNavService.getSideNavOptions();
    this.activeOption = this.sideNavService.getActiveOption();
  }

  setActiveOption(name: string) {
    this.activeOption = name;
  }

  isOptionActive(name: string): boolean {
    return this.activeOption === name;
  }

  onNavOptionSelect(option: SideNavOption): void {
    this.router.navigate([option.path]);
  }
}
