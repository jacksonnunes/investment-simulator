import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { TaxDTO } from 'src/client/bacen/dtos/tax.dto';
import { InvestimentoService } from './investimento.service';
import { CalcularTaxaEquivalenteService } from './calcular-taxa-equivalente.service';
import { CalcularValorImpostoRendaService } from './calcular-valor-imposto-renda.service';
import { CalcularRentabilidadeService } from './calcular-rentabilidade.service';
import { CalcularValorIofService } from './calcular-valor-iof.service';
import { CalcularInvestimentoService } from './calcular-investimento.service';
import { BacenClientService } from 'src/client/bacen/bacen-client.service';
import { PeriodicidadeEnum } from '../enums/periodicidade.enum';
import { InvestimentoRequestDTO } from '../dtos/investimento-request.dto';
import { ModalidadeEnum } from '../enums/modalidade.enum';
import { TaxaReferenciaEnum } from '../enums/taxa-referencia.enum';
import { InvestimentoResponseDTO } from '../dtos/investimento-response.dto';

describe('Calculate investments', () => {
  const calcularTaxaEquivalenteService = new CalcularTaxaEquivalenteService();
  const calcularValorImpostoRendaService =
    new CalcularValorImpostoRendaService();
  const calcularRentabilidadeService = new CalcularRentabilidadeService();
  const calcularValorIofService = new CalcularValorIofService();
  const calculateInvestmentWithIncomeTaxService =
    new CalcularInvestimentoService(
      calcularRentabilidadeService,
      calcularValorImpostoRendaService,
      calcularValorIofService,
    );
  const httpService = new HttpService();
  const bacenClientService = new BacenClientService(httpService);
  const calculateInvestmentsService = new InvestimentoService(
    bacenClientService,
    calcularTaxaEquivalenteService,
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
  });

  it('should return calculated investment', async () => {
    const investimentoRequestDTO: InvestimentoRequestDTO = {
      modalidade: ModalidadeEnum.CDB_RDB,
      principal: 1000,
      tempo: 3,
      periodicidade: PeriodicidadeEnum.ANOS,
      taxaReferencia: TaxaReferenciaEnum.CDI,
      percentualAtualizacao: 100,
    };

    const investimentoResponseDTO: InvestimentoResponseDTO = {
      modalidade: 'CDB / RDB',
      rentabilidade: 'CDI',
      tempoInvestimento: '3 anos',
      valorInvestido: 1000,
      parametros: {
        rentabilidadeBruta: 157.63,
        valorImpostoRenda: 23.64,
        valorIof: 0,
        rentabilidadeLiquida: 133.99,
        montante: 1133.99,
      },
    };

    await expect(
      calculateInvestmentsService.execute(investimentoRequestDTO),
    ).resolves.toEqual(investimentoResponseDTO);
  });
});
