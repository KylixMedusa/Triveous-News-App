import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedNewsComponent } from './searched-news.component';

describe('SearchedNewsComponent', () => {
  let component: SearchedNewsComponent;
  let fixture: ComponentFixture<SearchedNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
