import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNewsComponent } from './side-news.component';

describe('SideNewsComponent', () => {
  let component: SideNewsComponent;
  let fixture: ComponentFixture<SideNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
