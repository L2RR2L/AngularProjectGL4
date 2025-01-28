import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryVideoService } from '../../services/side-nav-options/library-video/library-video.service';
import { Video } from '../../types/video';
import { ListVideosSummaryComponent } from '../home-page/list-videos-summary/list-videos-summary.component';

@Component({
  selector: 'app-library-videos',
  standalone: true,
  imports: [ListVideosSummaryComponent],
  templateUrl: './library-videos.component.html',
  styleUrl: './library-videos.component.css',
})
export class LibraryVideosComponent implements OnInit {
  libraryId!: string;
  libraryVideos: Video[] = [];
  isLoadingLibraryVideos: boolean = true;
  constructor(
    private activeRoute: ActivatedRoute,
    private libraryVideoService: LibraryVideoService
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params) => {
      this.libraryId = params.get('libraryId')!;
      this.libraryVideoService
        .getLibraryVideos(this.libraryId)
        .subscribe((videos) => {
          this.libraryVideos = videos;
          this.isLoadingLibraryVideos = false;
        });
    });
  }
}
