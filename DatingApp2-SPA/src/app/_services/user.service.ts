import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

constructor(private http: HttpClient) { }

baseUrl = environment.apiUrl;

getUsers(): Observable<Array<User>> {
   return this.http.get<Array<User>>(this.baseUrl + 'users');
}

getUser(id: User): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.baseUrl + 'users/' + id);
}

}
