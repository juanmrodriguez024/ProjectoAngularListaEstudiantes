import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Students } from '../models/students';

@Injectable({
  providedIn: 'root'
})
  export class StudentListService {

  private url = "https://backend-idra-production.up.railway.app/student"

  constructor(private http: HttpClient) { }

  getAll(): Observable <any>{
    return this.http.get(this.url + '/getAll')
  }

  save(s: Students): Observable<any> {
    return this.http.post(this.url, s);
  }

 
  update(s: Students): Observable<any> {
    return this.http.post(this.url + '/' + s.id + '/update', s);
  }

  delete(id: number): Observable <any>{
    return 	this.http.post(this.url + '/' + id + '/delete', null)
  }

}