import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { API_URL } from '../../constants/urls';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  bodyHeight: number;
  API_URL = API_URL;
  chooseGuestUser:Boolean = true;
  chooseLogin:Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.bodyHeight = window.innerHeight;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.maxLength(255)]]
    })
  }

  loginAsGuest() {
    const guestUsername:string = '2007certain@gmail.com';
    const guestPassword:string = 'working21@';
    this.chooseLogin = false;
    this.loginForm.get('username').setValue(guestUsername);
    this.loginForm.get('password').setValue(guestPassword);
    this.login(this.loginForm);
  }

  loginSelected(){
    this.loginForm.get('username').setValue('');
    this.loginForm.get('password').setValue('');
    this.chooseGuestUser = false;
    this.chooseLogin = true;
  }

  login(form: FormGroup) {
    if (!form.valid) {
      alert("Fill the details to continue!");
    } else {
      this.dataService.loading = true;
      let url = this.dataService.getApiUrl() + this.API_URL.login;
      this.loginService.makeUserLogin(url, this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(res => {
        this.dataService.loading = false;
        localStorage.setItem('data', JSON.stringify(res));
        this.loginService.setUserLoggedIn();
        this.router.navigate(['/home']);
      }, error => {
        this.dataService.loading = false;
        alert(error.error.error_description);
      })
    }
  }
}