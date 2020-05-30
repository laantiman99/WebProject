import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOtherComponent } from './nav-other.component';

describe('NavOtherComponent', () => {
  let component: NavOtherComponent;
  let fixture: ComponentFixture<NavOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
