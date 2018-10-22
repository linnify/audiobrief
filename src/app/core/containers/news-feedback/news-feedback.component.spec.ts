import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedbackComponent } from './news-feedback.component';

describe('NewsFeedbackComponent', () => {
  let component: NewsFeedbackComponent;
  let fixture: ComponentFixture<NewsFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
