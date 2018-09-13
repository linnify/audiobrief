import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPageDisplayComponent } from './news-page-display.component';

describe('NewsPageDisplayComponent', () => {
  let component: NewsPageDisplayComponent;
  let fixture: ComponentFixture<NewsPageDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPageDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
