import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndNavComponent } from './end-nav.component';

describe('EndNavComponent', () => {
  let component: EndNavComponent;
  let fixture: ComponentFixture<EndNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
