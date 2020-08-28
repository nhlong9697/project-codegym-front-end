import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/containers/model/user/user';
import { UserService } from 'src/app/containers/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public formUser: FormGroup;
  user: User;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formUser = this._formBuilder.group(
      {
        firstName: [''],
        lastName: [''],
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

  checkPassWord(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmitForm() {
    this.createUser();
  }

  createUser() {
    let data = this.formUser.value;
    console.log(data);
    this.userService.createUser(data).subscribe((res) => {
      window.alert('create user success');
    });
  }

  get password() {
    return this.formUser.get('password');
  }
}
