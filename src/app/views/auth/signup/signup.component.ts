import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../containers/services/auth/auth.service';
import { SignupRequestPayload } from '../../../containers/model/auth/signup.payload';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formUser: FormGroup;
  signupRequestPayload: SignupRequestPayload;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formUser = this._formBuilder.group(
      {
        firstName: [''],
        lastName: [''],
        phoneNumber: [''],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '[a-z][a-z0-9]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}'
            ),
          ],
        ],
      },
      { Validators: this.checkPassWord }
    );

    // this.formUser.valueChanges.subscribe(data =>{console.log(data);
    // })
  }

  checkPassWord(group: FormGroup): any {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmitForm(): void {
    this.createUser();
  }

  createUser(): void {
    const data = this.formUser.value;
    console.log(data);
    this.authService.signup(data).subscribe((res) => {
      window.alert('create user success');
    });
  }

  get password() {
    return this.formUser.get('password');
  }
}
