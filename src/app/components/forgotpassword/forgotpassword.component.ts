import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotForm:FormGroup;
  bodyHeight:number;
  constructor(
    private formBuilder:FormBuilder
  ) {
    this.bodyHeight = window.innerHeight;
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      username:['', [Validators.required, Validators.email]],
    })
  }
  forgot(form:FormGroup){
    console.log(form);
    if(!form.valid){
      alert("Fill the details to continue!")
    }else{
      console.log(form);
    }
  }

}
