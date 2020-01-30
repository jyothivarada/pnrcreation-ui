import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPnrComponent } from './ticket-pnr.component';

describe('TicketPnrComponent', () => {
  let component: TicketPnrComponent;
  let fixture: ComponentFixture<TicketPnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
