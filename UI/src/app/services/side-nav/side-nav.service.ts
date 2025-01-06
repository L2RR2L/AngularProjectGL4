import { Injectable } from '@angular/core';
import { SideNavOption, SideNavOptionService } from '../../types/side-nav-option';
import { HomeService } from '../side-nav-options/home/home.service';
import { LibraryService } from '../side-nav-options/library/library.service';
import { SubscriptionService } from '../side-nav-options/subscription/subscription.service';
import { TrendingService } from '../side-nav-options/trending/trending.service';
import { HistoryService } from '../side-nav-options/history/history.service';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {

  private navServices: Array<SideNavOptionService>;

  constructor(
    private homeService: HomeService,
    private libraryService: LibraryService,
    private subsscriptionService: SubscriptionService,
    private trendingService: TrendingService,
    private historyService: HistoryService
  ) {
    this.navServices = [
      this.homeService,
      this.trendingService,
      this.subsscriptionService,
      this.libraryService,
      this.historyService,
    ]
  }

  getSideNavOptions(): Array<SideNavOption> {
    return this.navServices.map((service) => service.getSideNavOption());
  }

  getActiveOption(): string {
    return this.homeService.getSideNavOption().name;
  }
}