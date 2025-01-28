import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryVideosComponent } from './library-videos.component';

describe('LibraryVideosComponent', () => {
  let component: LibraryVideosComponent;
  let fixture: ComponentFixture<LibraryVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryVideosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
