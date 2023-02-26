import { Injectable } from '@nestjs/common';

import { InvestmentParametersDTO } from '../dtos/investment-parameters.dto';
import { CalculateIncomeTaxService } from './calculate-income-tax.service';
import { CalculateIncomeService } from './calculate-income.service';
import { CalculateIofService } from './calculate-iof.service';

@Injectable()
export class CalculateInvestmentWithIncomeTaxService {
  constructor(
    private calculateIncomeService: CalculateIncomeService,
    private calculateIncomeTaxService: CalculateIncomeTaxService,
    private calculateIofService: CalculateIofService,
  ) {}

  public execute(
    principal: number,
    numberOfPeriods: number,
    decimalTax: number,
  ): InvestmentParametersDTO {
    const grossIncome = this.calculateIncomeService.execute(
      principal,
      decimalTax,
      numberOfPeriods,
    );

    const iofTax = this.calculateIofService.execute(
      grossIncome,
      numberOfPeriods,
    );

    const incomeTax = this.calculateIncomeTaxService.execute(
      grossIncome - iofTax,
      numberOfPeriods,
    );

    const netIncome = grossIncome - iofTax - incomeTax;

    const investmentResponseDTO: InvestmentParametersDTO = Object.assign({
      grossIncome,
      incomeTax,
      iofTax,
      netIncome,
      amount: principal + netIncome,
    });

    return investmentResponseDTO;
  }
}
