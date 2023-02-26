import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { TaxDTO } from 'src/client/bacen/dtos/tax.dto';
import { CalculateInvestmentsService } from './calculate-investments.service';
import { CalculateTaxEquivalentService } from './calculate-tax-equivalent.service';
import { CalculateIncomeTaxService } from './calculate-income-tax.service';
import { CalculateIncomeService } from './calculate-income.service';
import { CalculateIofService } from './calculate-iof.service';
import { CalculateInvestmentWithIncomeTaxService } from './calculate-investment-with-income-tax.service';
import { BacenClientService } from 'src/client/bacen/bacen-client.service';
import { PeriodEnum } from '../enums/period.enum';

describe('Calculate investments', () => {
  const calculateTaxEquivalentService = new CalculateTaxEquivalentService();
  const calculateIncomeTaxService = new CalculateIncomeTaxService();
  const calculateIncomeService = new CalculateIncomeService();
  const calculateIofService = new CalculateIofService();
  const calculateInvestmentWithIncomeTaxService =
    new CalculateInvestmentWithIncomeTaxService(
      calculateIncomeService,
      calculateIncomeTaxService,
      calculateIofService,
    );
  const httpService = new HttpService();
  const bacenClientService = new BacenClientService(httpService);
  const calculateInvestmentsService = new CalculateInvestmentsService(
    bacenClientService,
    calculateTaxEquivalentService,
    calculateInvestmentWithIncomeTaxService,
  );

  beforeAll(() => {
    const taxList: Promise<AxiosResponse<TaxDTO[]>> = Promise.resolve({
      data: [
        {
          data: '13/02/2023',
          valor: 13.65,
        },
        {
          data: '14/02/2023',
          valor: 5,
        },
      ],
      config: null,
      headers: null,
      status: null,
      statusText: null,
    });

    jest
      .spyOn(bacenClientService, 'findCdiTax')
      .mockImplementation(() => taxList);

    jest
      .spyOn(bacenClientService, 'findIpcaTax')
      .mockImplementation(() => taxList);

    calculateInvestmentsService.initialize();
  });

  it('should return eight different investments', async () => {
    await expect(
      (
        await calculateInvestmentsService.execute(1000, 3, PeriodEnum.YEARS)
      ).length,
    ).resolves.toEqual(8);
  });
});
