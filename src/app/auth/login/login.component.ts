import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
      }, 
      (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }

}
