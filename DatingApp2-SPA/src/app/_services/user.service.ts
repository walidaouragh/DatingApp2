import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { idLocale } from 'ngx-bootstrap';

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

updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
}

}
