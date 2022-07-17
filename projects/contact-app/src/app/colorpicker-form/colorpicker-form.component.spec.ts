import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorpickerFormComponent } from './colorpicker-form.component';

describe('ColorpickerFormComponent', () => {
  let component: ColorpickerFormComponent;
  let fixture: ComponentFixture<ColorpickerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorpickerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorpickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
