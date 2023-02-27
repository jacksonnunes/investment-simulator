import { Injectable } from '@nestjs/common';

import { InvestimentoParametrosDTO } from '../dtos/investimento-parametros.dto';
import { PeriodicidadeEnum } from '../enums/periodicidade.enum';
import { calcularDiasUtil } from '../utils/calcular-dias.util';
import { CalcularValorImpostoRendaService } from './calcular-valor-imposto-renda.service';
import { CalcularRentabilidadeService } from './calcular-rentabilidade.service';
import { CalcularValorIofService } from './calcular-valor-iof.service';

@Injectable()
export class CalcularInvestimentoService {
  constructor(
    private calcularRentabilidadeService: CalcularRentabilidadeService,
    private calcularValorImpostoRendaService: CalcularValorImpostoRendaService,
    private calcularValorIofService: CalcularValorIofService,
  ) {}

  public execute(
    principal: number,
    tempoInvestimento: number,
    periodicidade: PeriodicidadeEnum,
    taxaDecimal: number,
    incideIR: boolean,
  ): InvestimentoParametrosDTO {
    const rentabilidadeBruta = this.calcularRentabilidadeService.execute(
      principal,
      taxaDecimal,
      tempoInvestimento,
    );

    const dias = calcularDiasUtil(tempoInvestimento, periodicidade);

    const valorIof = this.calcularValorIofService.execute(
      rentabilidadeBruta,
      dias,
    );

    const valorImpostoRenda = incideIR
      ? Number(
          this.calcularValorImpostoRendaService
            .execute(rentabilidadeBruta - valorIof, dias)
            .toFixed(2),
        )
      : 0;

    const rentabilidadeLiquida = Number(
      (rentabilidadeBruta - valorIof - valorImpostoRenda).toFixed(2),
    );

    const investimentoResponseDTO: InvestimentoParametrosDTO = Object.assign({
      rentabilidadeBruta,
      valorImpostoRenda,
      valorIof,
      rentabilidadeLiquida,
      montante: principal + rentabilidadeLiquida,
    });

    return investimentoResponseDTO;
  }
}
