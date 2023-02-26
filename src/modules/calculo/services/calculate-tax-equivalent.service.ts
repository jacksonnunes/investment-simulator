import { Injectable } from '@nestjs/common';
import { PeriodEnum } from '../enums/period.enum';

@Injectable()
export class CalculateTaxEquivalentService {
  public execute(
    tax: number,
    currentPeriod: PeriodEnum,
    willingPeriod: PeriodEnum,
  ) {
    let exponent: number;

    if (
      currentPeriod === PeriodEnum.DAYS &&
      willingPeriod === PeriodEnum.MONTHS
    ) {
      exponent = 30 / 1;
    } else if (
      currentPeriod === PeriodEnum.DAYS &&
      willingPeriod === PeriodEnum.YEARS
    ) {
      exponent = 360 / 1;
    } else if (
      currentPeriod === PeriodEnum.MONTHS &&
      willingPeriod === PeriodEnum.DAYS
    ) {
      exponent = 1 / 30;
    } else if (
      currentPeriod === PeriodEnum.MONTHS &&
      willingPeriod === PeriodEnum.YEARS
    ) {
      exponent = 12 / 1;
    } else if (
      currentPeriod === PeriodEnum.YEARS &&
      willingPeriod === PeriodEnum.DAYS
    ) {
      exponent = 1 / 360;
    } else if (
      currentPeriod === PeriodEnum.YEARS &&
      willingPeriod === PeriodEnum.MONTHS
    ) {
      exponent = 1 / 12;
    }

    const equivalentTax = Math.pow(1 + tax, exponent) - 1;

    return Number(equivalentTax.toFixed(8));
  }
}
