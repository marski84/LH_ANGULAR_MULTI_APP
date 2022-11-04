import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomNipInputComponent } from './custom-nip-input.component';

describe('CustomNipInputComponent', () => {
  let component: CustomNipInputComponent;
  let fixture: ComponentFixture<CustomNipInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomNipInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomNipInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
