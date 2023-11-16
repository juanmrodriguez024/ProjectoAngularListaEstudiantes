import { TestBed } from '@angular/core/testing';

import { StudentListService } from './estudiante-lista.service';

describe('EstudianteListaService', () => {
  let service: StudentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
