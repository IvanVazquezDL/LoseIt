import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public user!: User;
  public profileForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email: [this.user.email],
      username: [this.user.username],
      gender: [this.user.gender || ''],
      weight: [this.user.weight || null],
      height: [this.user.height || null],
      age: [this.user.age || null],
      activity: [this.user.activity || null],
    })
  }

  updateProfileData() {
    this.userService.updateUser(this.profileForm.value)
    .subscribe( () => {
      this.user.weight = this.profileForm.value.weight; 
      Swal.fire('Saved', 'The changes were saved', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
