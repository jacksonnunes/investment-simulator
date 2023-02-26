import { Injectable } from '@nestjs/common';

import { iofRegressivoUtil } from '../utils/iof-regressivo.util';

@Injectable()
export class CalcularValorIofService {
  public execute(rentabilidade: number, dias: number): number {
    if (dias <= 30) {
      const iof = iofRegressivoUtil.find((taxa) => taxa.dias === dias);
      return Number((rentabilidade * iof.taxaIncidencia).toFixed(2));
    } else {
      return 0;
    }
  }
}
