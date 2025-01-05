import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVideosSummaryComponent } from './list-videos-summary.component';

describe('ListVideosSummaryComponent', () => {
  let component: ListVideosSummaryComponent;
  let fixture: ComponentFixture<ListVideosSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVideosSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVideosSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
