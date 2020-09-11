import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { UpdateUserRequest } from 'src/app/containers/model/auth/update-user-request';
import { v4 as uuid } from 'uuid';
import { Observable, throwError } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  username = this.activatedRoute.snapshot.paramMap.get('username');
  updateUserForm: FormGroup;
  user: UpdateUserRequest;
  uploadPercent: Observable<number>;
  // image: string;
  files: File[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user = {
      id: 0,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      username: '',
      image: '',
    };
  }

  ngOnInit(): void {
    this.getUserByUsername();
    // this.upload(this.file);

    this.updateUserForm = this.fb.group({
      id: [this.user.id],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('(09|01[2|6|8|9])+([0-9]{8})\\b'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      image: [this.user.image],
    });
  }

  getUserByUsername = () => {
    this.authService.getUserByUsername(this.username).subscribe(
      (res) => {
        this.user = res;
        this.updateUserForm.patchValue(res);
        // console.log(this.user);
      },
      (rej) => {
        console.log('Get user failed!');
      }
    );
  };

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    if (this.files.length > 1) {
      // checking if files array has more than one content
      this.replaceFile(); // replace file
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  updateUser(): void {
    let filePath = '';
    const file = this.files[0];
    console.log(this.user.image);

    if (this.user.image == null) {
      filePath = `users/${Date.now()}_${uuid()}`;
    }
    else {
      filePath = this.user.image;
    }
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.user = this.updateUserForm.value;
          this.user.image = filePath;
          // console.log(this.user);
          // console.log(filePath);
          this.authService.updateUser(this.user).subscribe(
            (res) => {
              this.toastr.success('Update user detail successfully!');
              this.router.navigate(['']);
            },
            (rej) => {
              this.toastr.error('Update user detail failed');
            }
          );
        })
      )
      .subscribe();
  }

  replaceFile() {
    this.files.splice(0, 1); // index =0 , remove_count = 1
  }
}
