import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

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
    ).then((value) => {
      return value;
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
    ).then((value) => {
      return value;
    });
  }
}
