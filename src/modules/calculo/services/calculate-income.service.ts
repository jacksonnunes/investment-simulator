import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateIncomeService {
  public execute(
    principal: number,
    nominalInterest: number,
    numberOfPeriods: number,
  ): number {
    const earnings =
      principal * (Math.pow(1 + nominalInterest, numberOfPeriods) - 1);
    return Number(earnings.toFixed(2));
  }
}
