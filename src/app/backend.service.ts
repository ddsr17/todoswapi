import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) { }


  getData(): Observable<any>{
    return this.http.get("https://demo0166399.mockable.io/");
  }

}
