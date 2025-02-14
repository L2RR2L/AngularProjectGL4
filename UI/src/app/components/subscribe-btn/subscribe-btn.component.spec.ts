import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeBtnComponent } from './subscribe-btn.component';

describe('SubscribeBtnComponent', () => {
  let component: SubscribeBtnComponent;
  let fixture: ComponentFixture<SubscribeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscribeBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
