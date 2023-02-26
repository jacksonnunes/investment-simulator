import { PeriodicidadeEnum } from '../enums/periodicidade.enum';

export const calcularDiasUtil = (
  tempo: number,
  periodicidade: PeriodicidadeEnum,
): number => {
  if (periodicidade === PeriodicidadeEnum.ANOS) {
    return tempo * 360;
  } else if (periodicidade === PeriodicidadeEnum.MESES) {
    return tempo * 30;
  } else {
    return tempo;
  }
};
