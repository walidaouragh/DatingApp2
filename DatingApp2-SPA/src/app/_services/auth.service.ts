import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {

constructor(private http: HttpClient) { }

baseUrl = environment.apiUrl + 'auth/';
jwthelper = new JwtHelperService();
decodedToken: any;
currentUser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();

changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
        map(res => {
            const user: any = res;
            if (user) {
                localStorage.setItem('token', user.token);
                localStorage.setItem('user', JSON.stringify(user.user));
                this.decodedToken = this.jwthelper.decodeToken(user.token);
                this.currentUser = user.user;
                this.changeMemberPhoto(this.currentUser.photoUrl);
            }
        })
    );
}

register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwthelper.isTokenExpired(token);
}

}
