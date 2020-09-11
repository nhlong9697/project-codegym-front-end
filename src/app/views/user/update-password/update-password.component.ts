import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserPassword } from 'src/app/containers/model/auth/user-password';
import { ActivatedRoute } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  userPass: UserPassword;
  updatePasswordUserForm: FormGroup;
  username = this.activatedRoute.snapshot.paramMap.get('username');


  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService
  )
    {
      this.userPass = {
        // id: 0,
        username: '',
        newPassword: '',
        oldPassword: '',
      };
    }

  ngOnInit(): void {
    this.updatePasswordUserForm = this.fb.group({
      username: [this.username],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      cfPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    { Validators: this.checkPassWord })
  }

  checkPassWord(group: FormGroup): any {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.cfPassword.value;
    debugger
    return pass === confirmPass ? null : { notSame: true };
  }

  changePasswordUser() {
    this.userPass.username = this.updatePasswordUserForm.get('username').value;
    this.userPass.newPassword = this.updatePasswordUserForm.get('newPassword').value;
    this.userPass.oldPassword = this.updatePasswordUserForm.get('oldPassword').value;
    console.log(this.userPass);

    this.authService.changePasswordUser(this.userPass).subscribe((res) => {
      this.toastr.success('Change password success');
    },
    (rej) => {
      this.toastr.error('Failed to change password');
    });
  }
}
