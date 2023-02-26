import { Injectable } from '@nestjs/common';

import { regressiveIofUtil } from '../utils/iof-regressivo.util';

@Injectable()
export class CalculateIofService {
  public execute(value: number, days: number): number {
    if (days < 30) {
      const iof = regressiveIofUtil.find((tax) => tax.days === days);
      return Number((value * iof.taxRate).toFixed(2));
    } else {
      return 0;
    }
  }
}
