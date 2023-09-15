import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/dto/AuthRequest.class';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });
  public loginRequest: LoginRequest = {
    username: "",
    password: ""
  }
  constructor(
    private authService: AuthService,
    private _router: Router,) {

  }

  onSubmit() {
    this.authService.login(this.loginRequest).subscribe(
      data => {
        if (data) {
          this._router.navigateByUrl("");
        } else {
          alert("không chính xác")
        }
      }
    )
  }
}
