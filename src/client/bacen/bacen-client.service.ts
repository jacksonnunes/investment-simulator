import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

import { AppError } from 'src/errors/app.error';
import { TaxDTO } from './dtos/tax.dto';

@Injectable()
export class BacenClientService {
  constructor(private readonly httpService: HttpService) {}

  public async findCdiTax(
    dataInicial: string,
    dataFinal: string,
  ): Promise<AxiosResponse<TaxDTO[]>> {
    return firstValueFrom(
      this.httpService.get<TaxDTO[]>(
        `https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`,
      ),
    )
      .then((value) => {
        return value;
      })
      .catch((error) => {
        throw new AppError(
          'Problemas ao buscar a taxa de CDI na base de dados do BACEN.',
          500,
        );
      });
  }

  public async findIpcaTax(
    dataInicial: string,
    dataFinal: string,
  ): Promise<AxiosResponse<TaxDTO[]>> {
    return firstValueFrom(
      this.httpService.get<TaxDTO[]>(
        `https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`,
      ),
    )
      .then((value) => {
        return value;
      })
      .catch((error) => {
        throw new AppError(
          'Problemas ao buscar a taxa de IPCA na base de dados do BACEN.',
          500,
        );
      });
  }
}
