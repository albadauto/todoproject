import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTreinoComponent } from './form-treino.component';

describe('FormTreinoComponent', () => {
  let component: FormTreinoComponent;
  let fixture: ComponentFixture<FormTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTreinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
