import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTimeLogComponent } from './daily-time-log.component';

describe('DailyTimeLogComponent', () => {
  let component: DailyTimeLogComponent;
  let fixture: ComponentFixture<DailyTimeLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyTimeLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyTimeLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
