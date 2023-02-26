import { CalculateIncomeTaxService } from './calculate-income-tax.service';

describe('Calculate Income Tax', () => {
  const calculateIncomeTaxService = new CalculateIncomeTaxService();

  it('should calculate income tax into first track', () => {
    const income = 200;
    const days = 60;
    const incomeTax = 45;

    expect(calculateIncomeTaxService.execute(income, days)).toEqual(incomeTax);
  });

  it('should calculate income tax into second track', () => {
    const income = 200;
    const days = 181;
    const incomeTax = 40;

    expect(calculateIncomeTaxService.execute(income, days)).toEqual(incomeTax);
  });

  it('should calculate income tax into third track', () => {
    const income = 200;
    const days = 361;
    const incomeTax = 35;

    expect(calculateIncomeTaxService.execute(income, days)).toEqual(incomeTax);
  });

  it('should calculate income tax into fourth track', () => {
    const income = 200;
    const days = 721;
    const incomeTax = 30;

    expect(calculateIncomeTaxService.execute(income, days)).toEqual(incomeTax);
  });
});
