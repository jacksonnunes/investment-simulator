import { PeriodEnum } from '../enums/period.enum';

export const periodFormatUtil = (
  numberOfPeriods: number,
  period: PeriodEnum,
): string => {
  if (period === PeriodEnum.DAYS) {
    return numberOfPeriods > 1
      ? `${numberOfPeriods} dias`
      : `${numberOfPeriods} dia`;
  } else if (period === PeriodEnum.MONTHS) {
    return numberOfPeriods > 1
      ? `${numberOfPeriods} meses`
      : `${numberOfPeriods} mês`;
  } else {
    return numberOfPeriods > 1
      ? `${numberOfPeriods} anos`
      : `${numberOfPeriods} ano`;
  }
};
