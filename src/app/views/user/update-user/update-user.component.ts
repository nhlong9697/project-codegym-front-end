import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/containers/services/auth/auth.service';
import { UpdateUserRequest } from 'src/app/containers/model/auth/update-user-request';
import {v4 as uuid} from 'uuid';
import {Observable, throwError} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';




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
  file: File;



  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: AngularFireStorage
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
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('(09|01[2|6|8|9])+([0-9]{8})\\b'),]
      ],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'),]
      ],
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),]
      ],
      image: [this.user.image],
    });

  }

  getUserByUsername = () => {
    this.authService.getUserByUsername(this.username).subscribe(
      (res) => {
        this.user = res;
        this.updateUserForm.patchValue(res);
        console.log(this.user);
      },
      (rej) => {
        console.log("Get user failed!");
      }
    );
  };

  updateUser() {
    this.user = this.updateUserForm.value;
    console.log(this.user);

    this.authService.updateUser(this.user).subscribe((res) => {
      window.alert("Update successed!");
    },
    (rej) => {
      window.alert("Update failed");
    })
  }

  onSelect(event): void {
    console.log(event);
    this.file = event.addedFiles[0]
  }

  onRemove(event): void {
    console.log(event);
    this.file= null;
  }

  private upload(file: File): void {
    const filePath = `users/${Date.now()}_${uuid()}`;
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(
      finalize(() => {
        this.user.image = filePath;
      })
    ).subscribe();
  }
}
