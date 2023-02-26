import { Module } from '@nestjs/common';

import { CalculateInvestmentWithIncomeTaxService } from './services/calculate-investment-with-income-tax.service';

@Module({
  providers: [CalculateInvestmentWithIncomeTaxService],
})
export class CalculoModule {}
