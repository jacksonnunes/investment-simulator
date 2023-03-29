import { Injectable } from '@nestjs/common';
import { sub } from 'date-fns';

import { BacenClientService } from 'src/client/bacen/bacen-client.service';
import { InvestimentoRequestDTO } from '../dtos/investimento-request.dto';
import { InvestimentoResponseDTO } from '../dtos/investimento-response.dto';
import { ModalidadeEnum } from '../enums/modalidade.enum';
import { PeriodicidadeEnum } from '../enums/periodicidade.enum';
import { TaxaReferenciaEnum } from '../enums/taxa-referencia.enum';
import { dateFormatUtil } from '../utils/date-format.util';
import { taxaDecimalFormatUtil } from '../utils/taxa-decimal-format.util';
import { periodicidadeFormatUtil } from '../utils/periodicidade-format.util';
import { rentabilidadeFormatUtil } from '../utils/rentabilidade-format.util';
import { CalcularInvestimentoService } from './calcular-investimento.service';
import { CalcularTaxaEquivalenteService } from './calcular-taxa-equivalente.service';

@Injectable()
export class InvestimentoService {
  constructor(
    private bacenClientService: BacenClientService,
    private calculateTaxEquivalentService: CalcularTaxaEquivalenteService,
    private calcularInvestimentoService: CalcularInvestimentoService,
  ) {}

  public async execute({
    modalidade,
    principal,
    tempo,
    periodicidade,
    taxaReferencia,
    percentualAtualizacao,
  }: InvestimentoRequestDTO): Promise<InvestimentoResponseDTO> {
    const investimentoResponseDTO: InvestimentoResponseDTO = Object.assign({
      modalidade: modalidade.valueOf(),
      rentabilidade: rentabilidadeFormatUtil(
        taxaReferencia,
        percentualAtualizacao,
      ),
      tempoInvestimento: periodicidadeFormatUtil(tempo, periodicidade),
      valorInvestido: principal,
    });

    let taxaAtualizacao: number;

    if (taxaReferencia === TaxaReferenciaEnum.CDI) {
      const tresMesesAtras = dateFormatUtil(sub(new Date(), { months: 3 }));
      const hoje = dateFormatUtil(new Date());
      const listaTaxaCdiDTO = await this.bacenClientService.findCdiTax(
        tresMesesAtras,
        hoje,
      );

      const percentualAtualizacaoDecimal = taxaDecimalFormatUtil(
        percentualAtualizacao,
      );

      taxaAtualizacao =
        percentualAtualizacaoDecimal *
        listaTaxaCdiDTO.data[listaTaxaCdiDTO.data.length - 1].valor;
    } else if (taxaReferencia === TaxaReferenciaEnum.IPCA) {
      const tresMesesAtras = dateFormatUtil(sub(new Date(), { months: 3 }));
      const hoje = dateFormatUtil(new Date());
      const listaTaxaIpcaDTO = await this.bacenClientService.findCdiTax(
        tresMesesAtras,
        hoje,
      );

      taxaAtualizacao =
        listaTaxaIpcaDTO.data.at(-1).valor + percentualAtualizacao;
    } else {
      taxaAtualizacao = percentualAtualizacao;
    }

    const taxaAtualizacaoDecimal = taxaDecimalFormatUtil(taxaAtualizacao);

    const taxaEquivalente =
      periodicidade === PeriodicidadeEnum.ANOS
        ? taxaAtualizacaoDecimal
        : this.calculateTaxEquivalentService.execute(
            taxaAtualizacaoDecimal,
            PeriodicidadeEnum.ANOS,
            periodicidade,
          );

    const incideIR =
      modalidade === ModalidadeEnum.TESOURO_DIRETO ||
      modalidade === ModalidadeEnum.CDB_RDB;

    investimentoResponseDTO.parametros =
      this.calcularInvestimentoService.execute(
        principal,
        tempo,
        periodicidade,
        taxaEquivalente,
        incideIR,
      );

    return investimentoResponseDTO;
  }
}
