import { CalculateIncomeService } from './calculate-income.service';

describe('Calculate Income', () => {
  const calculateIncomeService = new CalculateIncomeService();

  it('should calculate income', () => {
    const principal = 1000;
    const nominalInterest = 0.03;
    const numberOfPeriods = 3;
    const income = 92.73;
    expect(
      calculateIncomeService.execute(
        principal,
        nominalInterest,
        numberOfPeriods,
      ),
    ).toEqual(income);
  });
});
