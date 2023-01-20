import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styles: [
  ]
})
export class RoomsComponent implements OnInit{

  //  todo: create model
  rooms!: any[];
  constructor(
    private roomService: RoomsService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.roomService.getRoomsByUserId(this.userService.uid)
      .subscribe(resp => {
        this.rooms = resp.rooms
      })
  }


}
