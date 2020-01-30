import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPnrComponent } from './cancel-pnr.component';

describe('CancelPnrComponent', () => {
  let component: CancelPnrComponent;
  let fixture: ComponentFixture<CancelPnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelPnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelPnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
