import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsPageDisplayComponent } from './topics-page-display.component';

describe('TopicsPageDisplayComponent', () => {
  let component: TopicsPageDisplayComponent;
  let fixture: ComponentFixture<TopicsPageDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsPageDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsPageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
