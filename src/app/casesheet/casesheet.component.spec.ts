import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesheetComponent } from './casesheet.component';

describe('CasesheetComponent', () => {
  let component: CasesheetComponent;
  let fixture: ComponentFixture<CasesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
