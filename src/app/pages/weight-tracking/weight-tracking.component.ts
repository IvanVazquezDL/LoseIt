import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WeightService } from 'src/app/services/weight.service';

@Component({
  selector: 'app-weight-tracking',
  templateUrl: './weight-tracking.component.html',
  styleUrls: []
})
export class WeightTrackingComponent implements OnInit {

  weights!: any[];

  constructor(
    private weightService: WeightService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.weightService.getWeightRecordsById(this.userService.user.uid as string)
      .subscribe(resp => {
        this.weights = resp.weight.sort((a: any,b: any) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        let pastWeight = 0;

        for(let i=0; i < this.weights.length; i++) {
          this.weights[i].difference = i === 0 ? 'N/A' : this.weights[i].weight - pastWeight; 
          pastWeight = this.weights[i].weight;
        }

        this.weights = this.weights.reverse()
      })
  }

}
