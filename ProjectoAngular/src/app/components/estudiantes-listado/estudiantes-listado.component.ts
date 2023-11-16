import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { StudentListService } from 'src/app/services/estudiante-lista.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Students } from 'src/app/models/students';
import { FormControl,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-estudiantes-listado',
  templateUrl: './estudiantes-listado.component.html',
  styleUrls: ['./estudiantes-listado.component.css']
})
  export class StudentListComponent implements OnInit {
   
  @ViewChild('confirmDelete', { static: false }) private confirmDeleteModal: TemplateRef<any>;
  studentToDelete: Students | null = null;

  studentList = new Array<Students>()

  id2: number
  dni2: string
  lastName2: string
  firstName2: string
  email2: string

  dni3: string
  lastName3: string
  firstName3: string
  email3: string

  student = new Students()
  studentForm : FormGroup

  constructor(private StudentListService: StudentListService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
        'dni': new FormControl(this.student.dni, Validators.required),
        'lastName': new FormControl(this.student.lastName, Validators.required),
        'firstName': new FormControl(this.student.firstName, Validators.required),
        'email': new FormControl(this.student.email, Validators.required),
    });
    this.getAll();
  }

  get dni() {return this.studentForm.get('dni')}
  get lastName() {return this.studentForm.get('lastName')}
  get firstName() {return this.studentForm.get('firstName')}
  get email() {return this.studentForm.get('email')}

  getAll(){
    this.StudentListService.getAll().subscribe(
      (response) => {
        this.studentList = response;
        console.log(this.studentList)
       
        
      },
    
    (error) => {
      console.error(error);
      alert('el getAll Funciono')
    }
    );
    }

    
    delete(id: number) {
      this.StudentListService.delete(id).subscribe(() => {
        location.reload()
      }, error => {
        console.error(error)
        alert('Error: ' + error.error.message)
      })
    }

    add() {
      
      this.student.dni = this.dni?.value;
      this.student.lastName = this.lastName?.value;
      this.student.firstName = this.firstName?.value;
      this.student.email = this.email?.value;
      this.student.cohort = 0;
      this.student.status = 'activo';
      this.student.gender = 'masculino';
      this.student.address = 'abc123'; 
      this.student.phone = '000';
    
      
      this.StudentListService.save(this.student).subscribe(() => {
        this.studentForm.reset();
        location.reload() 
      }, error => {
        console.error(error);
        alert('Error: ' + error.error.message);
        document.getElementsByTagName('input')[0].focus();
      });
    }

    view(ver: any, s: Students) {
      this.id2 = s.id
      this.dni2 = s.dni
      this.lastName2 = s.lastName
      this.firstName2 = s.firstName
      this.email2 = s.email
      this.dni3 = s.dni
      this.lastName3 = s.lastName
      this.firstName3 = s.firstName
      this.email3 = s.email
      this.modalService.open(ver).result.then(() => {
        if (this.dni2.trim() !== '' && this.lastName2.trim() !== '' && this.firstName2.trim() !== '' && this.email2.trim() !== '' &&
          (this.dni2.trim() !== this.dni3.trim() || this.lastName2.trim() !== this.lastName3.trim() || this.firstName2.trim() !== this.firstName3.trim() || this.email2.trim() !== this.email3.trim())) {
          let student = new Students()
          student.id = this.id2
          student.dni = this.dni2
          student.lastName = this.lastName2
          student.firstName = this.firstName2
          student.email = this.email2
          student.cohort = 0
          student.status = 'activo'
          student.gender = 'masculino'
          student.address = 'abc123'
          student.phone = '000'
          this.StudentListService.update(student).subscribe(() => {
            location.reload()
          }, error => {
            console.error(error)
            alert('Error: ' + error.message)
          })
        }
      }, reason => { })
    }