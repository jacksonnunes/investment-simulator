import { PeriodicidadeEnum } from '../enums/periodicidade.enum';

export const periodicidadeFormatUtil = (
  tempo: number,
  periodicidade: PeriodicidadeEnum,
): string => {
  if (periodicidade === PeriodicidadeEnum.DIAS) {
    return tempo > 1 ? `${tempo} dias` : `${tempo} dia`;
  } else if (periodicidade === PeriodicidadeEnum.MESES) {
    return tempo > 1 ? `${tempo} meses` : `${tempo} mês`;
  } else {
    return tempo > 1 ? `${tempo} anos` : `${tempo} ano`;
  }
};
