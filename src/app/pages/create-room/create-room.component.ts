import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { RoomsService } from 'src/app/services/rooms.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: []
})
export class CreateRoomComponent implements OnInit{
  createRoomForm! : FormGroup;
  invitedUsers: any[] = [];
  maxUsers:number = 4;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roomService: RoomsService
  ) {}

  ngOnInit(): void {
    this.createRoomForm = this.fb.group({
      roomName: [''],
      invitedUsers: [this.invitedUsers],
      users: [{
        uid: this.userService.user.uid,
        username: this.userService.user.username,
        email: this.userService.user.email
      }]
    })
  }

  createRoom() {
    this.roomService.createRoom(this.createRoomForm.value)
      .subscribe(resp => console.log(resp));
  }

  addUserToInvitation(event: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    if (this.maxUsers === 0) {
      event.target.value = "";
      Toast.fire({
        icon: 'error',
        title: "Max number of invited users reached"
      });
      return;
    }
    if (event.target.value === this.userService.user.username
      || event.target.value === this.userService.user.email) {
        event.target.value = "";
        Toast.fire({
          icon: 'error',
          title: "Can't invite yourself to the group"
        });
        return;
      };

    this.userService.getUserByEmailOrUsername(event.target.value)
      .subscribe(resp => {
        if (resp.user.length) {
          this.invitedUsers.push({
            uid: resp.user[0].uid,
            username: resp.user[0].username,
            email: resp.user[0].email
          });
          this.maxUsers -= 1;
          event.target.value = "";

        } else {
          Toast.fire({
            icon: 'error',
            title: "Email/Username doesn't exists"
          });

          event.target.value = "";
        }
    });
  }

  deleteFromInvitation(username: string) {
    this.invitedUsers = this.invitedUsers.filter(user => user.username !== username);
    this.maxUsers += 1;
  }
}
