import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertyfyService } from '../_services/alertyfy.service';
import { Route } from '../../../node_modules/@angular/compiler/src/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertyfyService, private router: Router) { }

  ngOnInit() {
  }
  login() {

    this.authService.login(this.model).subscribe(date => {
      this.alertify.success('logged in sucessfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
  loggedIn() {
    /*const token = localStorage.getItem('token');
    return !!token;*/
    return this.authService.loggedIn();
  }
}
