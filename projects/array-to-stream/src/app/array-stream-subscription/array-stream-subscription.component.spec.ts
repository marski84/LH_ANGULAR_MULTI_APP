import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayStreamSubscriptionComponent } from './array-stream-subscription.component';

describe('ArrayStreamSubscriptionComponent', () => {
  let component: ArrayStreamSubscriptionComponent;
  let fixture: ComponentFixture<ArrayStreamSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayStreamSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayStreamSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
