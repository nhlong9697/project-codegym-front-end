import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../containers/services/auth/auth.service';
import { SignupRequestPayload } from '../../../containers/model/auth/signup.payload';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formUser: FormGroup;
  signupRequestPayload: SignupRequestPayload;
  signupRequestPayloads: SignupRequestPayload[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
    // this.listUser();
  }

  createForm() {
    this.formUser = this.formBuilder.group(
      {
        firstName: [''],
        lastName: [''],
        phoneNumber: ['',
        [
          Validators.required,
          Validators.pattern(
            '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'
          ),
        ]
      ],
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
    this.signUp();
  }

  signUp(): void {
    const data = this.formUser.value;
    console.log(data);
    this.authService.signup(data).subscribe((res) => {
        this.router.navigate(['/login'], {
          queryParams: { registered: 'true' },
        });
    }, error => {
        this.toastr.error('Registration failed try again');
    }
    );
  }



  // test(){
  //   const data = this.formUser.value;
  //   console.log(data);

  // }

  get password(){
    return this.formUser.get('password');
  }

}
