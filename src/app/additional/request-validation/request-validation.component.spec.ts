import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestValidationComponent } from './request-validation.component';

describe('RequestValidationComponent', () => {
  let component: RequestValidationComponent;
  let fixture: ComponentFixture<RequestValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
