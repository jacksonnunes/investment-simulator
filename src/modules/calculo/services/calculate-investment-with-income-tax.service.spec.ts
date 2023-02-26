import { CalculateIncomeTaxService } from './calculate-income-tax.service';
import { CalculateIncomeService } from './calculate-income.service';
import { CalculateInvestmentWithIncomeTaxService } from './calculate-investment-with-income-tax.service';
import { CalculateIofService } from './calculate-iof.service';

describe('Calculate investment with income tax', () => {
  const calculateIncomeService = new CalculateIncomeService();
  const calculateIncomeTaxService = new CalculateIncomeTaxService();
  const calculateIofService = new CalculateIofService();
  const investmentWithIncomeTax = new CalculateInvestmentWithIncomeTaxService(
    calculateIncomeService,
    calculateIncomeTaxService,
    calculateIofService,
  );

  it('should calculate an investment incurring IOF and income tax', async () => {
    const value = 1000;
    const numberOfPeriods = 28;
    const decimalTax = 0.00013554;

    const iofTax = 0.23;

    const investment = investmentWithIncomeTax.execute(
      value,
      numberOfPeriods,
      decimalTax,
    );

    expect(investment.iofTax).toEqual(iofTax);
  });
});
