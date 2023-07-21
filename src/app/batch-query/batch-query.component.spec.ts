import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchQueryComponent } from './batch-query.component';

describe('BatchQueryComponent', () => {
  let component: BatchQueryComponent;
  let fixture: ComponentFixture<BatchQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
