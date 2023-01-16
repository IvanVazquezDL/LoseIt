import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormulasService } from 'src/app/services/formulas.service';
import { UserService } from 'src/app/services/user.service';
import { WeightService } from 'src/app/services/weight.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  caloriesPerDay: number = 0;
  bmiScore: number = 0;
  hamwiFormula: number = 0;
  devineFormula: number = 0;
  robinsonFormula: number = 0;
  millerFormula: number = 0;
  weight: number = 0;
  user!: User;

  constructor(
    private userService: UserService,
    private formulasService: FormulasService,
    private weightService: WeightService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.user;
    this.caloriesPerDay = this.formulasService.getCaloriesPerDay(this.user);
    this.bmiScore = this.formulasService.getBMIScore(this.user);
    this.hamwiFormula = this.formulasService.getHamwiFormula(this.user);
    this.devineFormula = this.formulasService.getDevineFormula(this.user);
    this.robinsonFormula = this.formulasService.getRobinsonFormula(this.user);
    this.millerFormula = this.formulasService.getMillerFormula(this.user);
  }

  saveWeightRecord(weight: string) {
    if (weight === "") return;
    const date = this.getMonday();

    const data = {
      weight: parseFloat(weight),
      userId: this.userService.user.uid,
      username: this.userService.user.username,
      date,
      dateText: this.getDateToText(date),
    }

    console.log(data)

    this.weightService.createWeightRecord(data)
      .subscribe(resp => console.log(resp))
  }

  getMonday() {
    const date = new Date();
    //const date = new Date(2023,0,3);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    const newDate = new Date(date.setDate(diff))
    return new Date(newDate.setHours(0,0,0,0));
  }

  getDateToText(date: Date) {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) 
  }

}
