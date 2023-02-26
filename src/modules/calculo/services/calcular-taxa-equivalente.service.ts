import { Injectable } from '@nestjs/common';
import { PeriodicidadeEnum } from '../enums/periodicidade.enum';

@Injectable()
export class CalcularTaxaEquivalenteService {
  public execute(
    taxa: number,
    periodicidadeAtual: PeriodicidadeEnum,
    periodicidadeDesejada: PeriodicidadeEnum,
  ) {
    let expoente: number;

    if (
      periodicidadeAtual === PeriodicidadeEnum.DIAS &&
      periodicidadeDesejada === PeriodicidadeEnum.MESES
    ) {
      expoente = 30 / 1;
    } else if (
      periodicidadeAtual === PeriodicidadeEnum.DIAS &&
      periodicidadeDesejada === PeriodicidadeEnum.ANOS
    ) {
      expoente = 360 / 1;
    } else if (
      periodicidadeAtual === PeriodicidadeEnum.MESES &&
      periodicidadeDesejada === PeriodicidadeEnum.DIAS
    ) {
      expoente = 1 / 30;
    } else if (
      periodicidadeAtual === PeriodicidadeEnum.MESES &&
      periodicidadeDesejada === PeriodicidadeEnum.ANOS
    ) {
      expoente = 12 / 1;
    } else if (
      periodicidadeAtual === PeriodicidadeEnum.ANOS &&
      periodicidadeDesejada === PeriodicidadeEnum.DIAS
    ) {
      expoente = 1 / 360;
    } else if (
      periodicidadeAtual === PeriodicidadeEnum.ANOS &&
      periodicidadeDesejada === PeriodicidadeEnum.MESES
    ) {
      expoente = 1 / 12;
    }

    const taxaEquivalente = Math.pow(1 + taxa, expoente) - 1;

    return Number(taxaEquivalente.toFixed(8));
  }
}
