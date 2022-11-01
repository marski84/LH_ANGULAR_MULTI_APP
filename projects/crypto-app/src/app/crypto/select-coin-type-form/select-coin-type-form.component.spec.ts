import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoinTypeFormComponent } from './select-coin-type-form.component';

describe('SelectCoinTypeFormComponent', () => {
  let component: SelectCoinTypeFormComponent;
  let fixture: ComponentFixture<SelectCoinTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCoinTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCoinTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
