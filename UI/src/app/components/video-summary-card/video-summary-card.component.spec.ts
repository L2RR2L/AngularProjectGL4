import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSummaryCardComponent } from './video-summary-card.component';

describe('VideoComponent', () => {
  let component: VideoSummaryCardComponent;
  let fixture: ComponentFixture<VideoSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSummaryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
