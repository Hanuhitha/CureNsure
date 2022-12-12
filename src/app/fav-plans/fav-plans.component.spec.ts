import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavPlansComponent } from './fav-plans.component';

describe('FavPlansComponent', () => {
  let component: FavPlansComponent;
  let fixture: ComponentFixture<FavPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
