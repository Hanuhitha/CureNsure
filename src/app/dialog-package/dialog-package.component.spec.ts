import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPackageComponent } from './dialog-package.component';

describe('DialogPackageComponent', () => {
  let component: DialogPackageComponent;
  let fixture: ComponentFixture<DialogPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
