import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateIncomeTaxService {
  FIRST_TRACK = 0.225;
  SECOND_TRACK = 0.2;
  THIRD_TRACK = 0.175;
  FOURTH_TRACK = 0.15;

  public execute(income: number, days: number): number {
    if (days <= 180) {
      return income * this.FIRST_TRACK;
    } else if (days > 180 && days <= 360) {
      return income * this.SECOND_TRACK;
    } else if (days > 360 && days <= 720) {
      return income * this.THIRD_TRACK;
    } else {
      return income * this.FOURTH_TRACK;
    }
  }
}
