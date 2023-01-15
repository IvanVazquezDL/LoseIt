import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class FormulasService {
  constructor() { }

  getCaloriesPerDay(user: User) {
    // Mifflin-St Jeor Formula
    //Men: 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 
    //Women: 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161
    const ACTIVITY_FACTOR = {
      "Sedentary": 1.2,
      "Light Exercise": 1.375,
      "Moderate Exercise": 1.55,
      "Heavy Exercise": 1.725,
      "Athlete": 1.9
    };

    const GENDER_NUMBER = {
      "Male": 5,
      "Female": -161
    };

    const baseFormula = 10 * user.weight! + 6.25 * user.height! - 5 * user.age!;
    const genderNumber = GENDER_NUMBER[user.gender! as keyof typeof GENDER_NUMBER];
    const activityFactor = ACTIVITY_FACTOR[user.activity! as keyof typeof ACTIVITY_FACTOR];

    return (baseFormula + genderNumber) * activityFactor;
  }

  getHamwiFormula(user: User) {
    // Los cálculos se basan en cm y kg de acuerdo al siguiente algoritmo:
    // H = 48 kg por los primeros 152.4 cm + 1.1 kg por cada cm adicional.
    // M = 45 kg por los primeros 152.4 cm + 0.9 kg por cada cm adicional.

    const heightMinimumLimit = 152.4;

    if (user.height! < heightMinimumLimit) return 0;

    const BASELINE = {
      'Male': 48,
      'Female': 45
    };

    const FACTOR = {
      'Male': 1.1,
      'Female': 0.9
    };
  
    const factorKey = user.gender! as keyof typeof FACTOR;
    const baselineKey = user.gender! as keyof typeof BASELINE;
    return (user.height! - heightMinimumLimit) * FACTOR[factorKey] + BASELINE[baselineKey];
  }

  getDevineFormula(user: User) {
    const heightMinimumLimit = 152.4;

    if (user.height! < heightMinimumLimit) return 0;

    const BASELINE = {
      'Male': 50,
      'Female': 45.5
    };

    const FACTOR = {
      'Male': 0.9,
      'Female': 0.9
    };
  
    const factorKey = user.gender! as keyof typeof FACTOR;
    const baselineKey = user.gender! as keyof typeof BASELINE;
    return (user.height! - heightMinimumLimit) * FACTOR[factorKey] + BASELINE[baselineKey];
  }

  getRobinsonFormula(user: User) {
    const heightMinimumLimit = 152.4;

    if (user.height! < heightMinimumLimit) return 0;

    const BASELINE = {
      'Male': 52,
      'Female': 49
    };

    const FACTOR = {
      'Male': 0.75,
      'Female': 0.67
    };
  
    const factorKey = user.gender! as keyof typeof FACTOR;
    const baselineKey = user.gender! as keyof typeof BASELINE;
    return (user.height! - heightMinimumLimit) * FACTOR[factorKey] + BASELINE[baselineKey];
  }

  getMillerFormula(user: User) {
    const heightMinimumLimit = 152.4;

    if (user.height! < heightMinimumLimit) return 0;

    const BASELINE = {
      'Male': 56.2,
      'Female': 53.1
    };

    const FACTOR = {
      'Male': 0.56,
      'Female': 0.54
    };
  
    const factorKey = user.gender! as keyof typeof FACTOR;
    const baselineKey = user.gender! as keyof typeof BASELINE;
    return (user.height! - heightMinimumLimit) * FACTOR[factorKey] + BASELINE[baselineKey];
  }

  getBMIScore(user: User) {
    // BMI = weight / height(m)^2
    const heightInMeters = user.height! / 100;
    return user.weight! / (heightInMeters * heightInMeters);
  }
}
