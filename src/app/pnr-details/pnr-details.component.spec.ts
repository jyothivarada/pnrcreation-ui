import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnrDetailsComponent } from './pnr-details.component';

describe('PnrDetailsComponent', () => {
  let component: PnrDetailsComponent;
  let fixture: ComponentFixture<PnrDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnrDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
