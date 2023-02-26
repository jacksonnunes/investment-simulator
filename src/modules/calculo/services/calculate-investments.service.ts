import { Injectable } from '@nestjs/common';
import { sub } from 'date-fns';

import { BacenClientService } from 'src/client/bacen/bacen-client.service';
import { CalculateTaxEquivalentService } from './calculate-tax-equivalent.service';
import { TaxDTO } from 'src/client/bacen/dtos/tax.dto';
import { InvestmentResponseDTO } from '../dtos/investment-response.dto';
import { PeriodEnum } from '../enums/period.enum';
import { dateFormatUtil } from '../utils/date-format.util';
import { decimalTaxFormatUtil } from '../utils/decimal-tax-format.util';
import { CalculateInvestmentWithIncomeTaxService } from './calculate-investment-with-income-tax.service';
import { periodFormatUtil } from '../utils/period-format.util';

@Injectable()
export class CalculateInvestmentsService {
  cdiTax: TaxDTO;
  ipcaTax: TaxDTO;

  constructor(
    private bacenClientService: BacenClientService,
    private calculateTaxEquivalentService: CalculateTaxEquivalentService,
    private calculateInvestmentWithIncomeTaxService: CalculateInvestmentWithIncomeTaxService,
  ) {}

  async initialize() {
    const threeMonthsAgo = dateFormatUtil(sub(new Date(), { months: 3 }));
    const today = dateFormatUtil(new Date());
    const listCdiTaxDTO = await this.bacenClientService.findCdiTax(
      threeMonthsAgo,
      today,
    );

    this.cdiTax = listCdiTaxDTO.data.at(-1);

    const listIpcaTaxDTO = await this.bacenClientService.findCdiTax(
      threeMonthsAgo,
      today,
    );

    this.ipcaTax = listIpcaTaxDTO.data.at(-1);
  }

  public async execute(
    principal: number,
    numberOfPeriods: number,
    period: PeriodEnum,
  ): Promise<InvestmentResponseDTO[]> {
    const investment: InvestmentResponseDTO = Object.assign({
      period: periodFormatUtil(numberOfPeriods, period),
      principal,
    });

    const cdiEquivalentTax =
      period === PeriodEnum.YEARS
        ? this.cdiTax.valor
        : this.calculateTaxEquivalentService.execute(
            this.cdiTax.valor,
            PeriodEnum.YEARS,
            period,
          );
    const decimalCdiTax = decimalTaxFormatUtil(cdiEquivalentTax);

    const ipcaEquivalentTax =
      period === PeriodEnum.YEARS
        ? this.ipcaTax.valor
        : this.calculateTaxEquivalentService.execute(
            this.ipcaTax.valor,
            PeriodEnum.YEARS,
            period,
          );
    const decimalIpcaTax = decimalTaxFormatUtil(ipcaEquivalentTax);

    return null;
  }
}
