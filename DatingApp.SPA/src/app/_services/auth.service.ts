import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { from } from 'rxjs/Observable/from';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

baseUrl = 'http://localhost:5000/api/Auth/';
jwtHelper= new JwtHelperService();
decodedToken: any;
userToken: any;
constructor( private http: Http) { }

    login(model: any) {
        const headers = new Headers({'Content-type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.baseUrl + 'login', model, options).map((response: Response) => {
            const user = response.json();
            if (user) {
                localStorage.setItem('token', user.tokenString);
                this.userToken = user.tokenString;
                this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            }
        }).catch(this.handleError);
    }

    register(model: any) {
        return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);
    }

    loggedIn() {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
    private requestOptions() {
        const headers = new Headers({'Content-type': 'application/json'});
        return new RequestOptions({ headers: headers });
    }

    private handleError(error: any) {
        const appliicationError = error.headers.get('Application-Error');
        if (appliicationError) {
            return Observable.throw(appliicationError);
        }
        const serverError = error.json();
        let modelStateErrors = '';
        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        return Observable.throw(
            modelStateErrors || 'Server error'
        );

    }
}
