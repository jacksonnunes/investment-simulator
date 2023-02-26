import { PeriodEnum } from '../enums/period.enum';
import { CalculateTaxEquivalentService } from './calculate-tax-equivalent.service';

describe('Calculate tax-equivalent', () => {
  const calculateTaxEquivalentService = new CalculateTaxEquivalentService();

  it('should calculate the equivalent tax from daily to monthly', () => {
    const tax = 0.00035549;
    const currentPeriod = PeriodEnum.DAYS;
    const willingPeriod = PeriodEnum.MONTHS;

    const equivalentTax = 0.01071986;

    expect(
      calculateTaxEquivalentService.execute(tax, currentPeriod, willingPeriod),
    ).toEqual(equivalentTax);
  });

  it('should calculate the equivalent tax from daily to yearly', () => {
    const tax = 0.00035549;
    const currentPeriod = PeriodEnum.DAYS;
    const willingPeriod = PeriodEnum.YEARS;

    const equivalentTax = 0.13650033;

    expect(
      calculateTaxEquivalentService.execute(tax, currentPeriod, willingPeriod),
    ).toEqual(equivalentTax);
  });

  it('should calculate the equivalent tax from monthly to daily', () => {
    const tax = 0.01071983;
    const currentPeriod = PeriodEnum.MONTHS;
    const willingPeriod = PeriodEnum.DAYS;

    const equivalentTax = 0.00035549;

    expect(
      calculateTaxEquivalentService.execute(tax, currentPeriod, willingPeriod),
    ).toEqual(equivalentTax);
  });

  it('should calculate the equivalent tax from monthly to yearly', () => {
    const tax = 0.01071983;
    const currentPeriod = PeriodEnum.MONTHS;
    const willingPeriod = PeriodEnum.YEARS;

    const equivalentTax = 0.13649999;

    expect(
      calculateTaxEquivalentService.execute(tax, currentPeriod, willingPeriod),
    ).toEqual(equivalentTax);
  });

  it('should calculate the equivalent tax from yearly to daily', () => {
    const tax = 0.1365;
    const currentPeriod = PeriodEnum.YEARS;
    const willingPeriod = PeriodEnum.DAYS;

    const equivalentTax = 0.00035549;

    expect(
      calculateTaxEquivalentService.execute(tax, currentPeriod, willingPeriod),
    ).toEqual(equivalentTax);
  });

  it('should calculate the equivalent tax from yearly to monthly', () => {
    const tax = 0.1365;
    const currentPeriod = PeriodEnum.YEARS;
    const willingPeriod = PeriodEnum.MONTHS;

    const equivalentTax = 0.01071983;

    expect(
      calculateTaxEquivalentService.execute(tax, currentPeriod, willingPeriod),
    ).toEqual(equivalentTax);
  });
});
