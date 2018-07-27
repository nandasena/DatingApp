import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertyfyService } from '../_services/alertyfy.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  @Output() cancelRegister= new EventEmitter();
   /*@Input() valuesFromHome: any;*/

  constructor(private authService: AuthService, private alertify: AlertyfyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
     this.alertify.success('registration successful');
    }, error => {
        this.alertify.error(error);
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

}
