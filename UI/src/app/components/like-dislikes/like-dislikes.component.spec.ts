import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeDislikesComponent } from './like-dislikes.component';

describe('LikeDislikesComponent', () => {
  let component: LikeDislikesComponent;
  let fixture: ComponentFixture<LikeDislikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeDislikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeDislikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
