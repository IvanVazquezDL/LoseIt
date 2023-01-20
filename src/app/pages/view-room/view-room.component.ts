import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styles: ['']
})
export class ViewRoomComponent implements OnInit {
  
  room: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.roomsService.getRoomById(params.get('id') as string)
        .subscribe(resp => {
          this.room = resp.room
        })
    });
  }



}
