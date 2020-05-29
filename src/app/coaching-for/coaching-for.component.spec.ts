import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingForComponent } from './coaching-for.component';

describe('CoachingForComponent', () => {
  let component: CoachingForComponent;
  let fixture: ComponentFixture<CoachingForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachingForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachingForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
