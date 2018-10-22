import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedbackDisplayComponent } from './news-feedback-display.component';

describe('NewsFeedbackDisplayComponent', () => {
  let component: NewsFeedbackDisplayComponent;
  let fixture: ComponentFixture<NewsFeedbackDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFeedbackDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedbackDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
