/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WholesalerModuleComponent } from './wholesaler-module.component';

describe('WholesalerModuleComponent', () => {
  let component: WholesalerModuleComponent;
  let fixture: ComponentFixture<WholesalerModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesalerModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
