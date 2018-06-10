import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../../services/dataService';
import { regster } from '../../constants/urls';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  bodyHeight: number;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.bodyHeight = window.innerHeight;
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phonenumber: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    })
  }
  signup(form: FormGroup) {
    if (!form.valid) {
      alert("Fill the details to continue!")
    } else {
      this.dataService.loading = true;
      const url = this.dataService.getApiUrl() + regster.signup;
      let dataObj = {
        'email': this.signupForm.get('username').value,
        'password': this.signupForm.get('password').value,
        'confirmPassword': this.signupForm.get('confirmPassword').value,
        'PhoneNumber': this.signupForm.get('phonenumber').value,
        'LastName': this.signupForm.get('lastname').value,
        'FirstName': this.signupForm.get('firstname').value,
      };
      this.dataService.postDataObject(url, dataObj).subscribe(res => {
        console.log(res);
        this.dataService.loading = false;
        // this.router.navigate(['/login']);
      }, error => {
        this.dataService.loading = false;
        alert(error.error.error_description);
      })
    }
  }
}
