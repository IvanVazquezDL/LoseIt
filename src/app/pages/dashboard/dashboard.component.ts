import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormulasService } from 'src/app/services/formulas.service';
import { UserService } from 'src/app/services/user.service';

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
  user!: User;

  constructor(
    private userService: UserService,
    private formulasService: FormulasService
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

}
