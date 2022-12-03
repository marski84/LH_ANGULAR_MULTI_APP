import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMatRadioComponent } from './custom-mat-radio.component';

describe('CustomMatRadioComponent', () => {
  let component: CustomMatRadioComponent;
  let fixture: ComponentFixture<CustomMatRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMatRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomMatRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
