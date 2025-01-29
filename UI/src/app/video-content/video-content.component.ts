import {
  Component,
  computed,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { VideoService } from '../services/video/video.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
import { Video } from '../types/video';
import { ChannelService } from '../services/channel/channel.service';
import { LikeDislikesComponent } from '../components/like-dislikes/like-dislikes.component';
import { SubscribeBtnComponent } from '../components/subscribe-btn/subscribe-btn.component';
import moment from 'moment';
import { AddVideoLibraryModalComponent } from '../components/add-video-library-modal/add-video-library-modal.component';
import { LibraryService } from '../services/side-nav-options/library/library.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-video-content',
  standalone: true,
  imports: [
    AsyncPipe,
    LikeDislikesComponent,
    SubscribeBtnComponent,
    AddVideoLibraryModalComponent,
    NgClass,
  ],
  templateUrl: './video-content.component.html',
  styleUrl: './video-content.component.css',
})
export class VideoContentComponent implements OnChanges {
  video = input<Video>({
    id: '',
    title: '',
    views: 0,
    createdAt: '',
    description: '',
    duration: '',
    thumbnailLink: '',
    videoLink: '',
    channelId: '',
    channelName: '',
    channelImg: '',
  });
  channelSubscriptionsCount = new Observable<number>();
  showMore = signal<boolean>(false);
  showModal: boolean = false;
  toast = toast;

  creationDate = computed(() => {
    const date = new Date(this.video().createdAt) || new Date();
    return moment(date).format('MMM DD, YYYY');
  });

  constructor(
    protected videoService: VideoService,
    protected channelService: ChannelService,
    protected libraryService: LibraryService
  ) {
    console.log(this.video());
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.handleSubscriptionChange();
  }

  handleSubscriptionChange() {
    if (this.video().channelId) {
      this.channelSubscriptionsCount =
        this.channelService.getChannelSubscriptionsCount(
          this.video().channelId
        );
    }
  }

  toggleShowMore() {
    this.showMore.set(!this.showMore());
  }
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }

  addVideoToLibrary(libraryId: string) {
    this.libraryService
      .addVideoToLibrary(libraryId, this.video().id)
      .subscribe((data) => {
        this.toast.success(data);
      });
  }
}
