import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListComponent } from './estudiantes-listado.component';

describe('EstudiantesListadoComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentListComponent]
    });
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
