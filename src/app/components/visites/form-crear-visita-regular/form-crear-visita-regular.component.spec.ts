import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearVisitaRegularComponent } from './form-crear-visita-regular.component';

describe('FormCrearVisitaRegularComponent', () => {
  let component: FormCrearVisitaRegularComponent;
  let fixture: ComponentFixture<FormCrearVisitaRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCrearVisitaRegularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCrearVisitaRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
