import { TaxaReferenciaEnum } from '../enums/taxa-referencia.enum';
import { separadorDecimalFormatUtil } from './separador-decimal-format.util';

export const rentabilidadeFormatUtil = (
  taxaReferencia: TaxaReferenciaEnum,
  percentualAtualizacao: number,
): string => {
  if (taxaReferencia === TaxaReferenciaEnum.CDI) {
    return `${
      percentualAtualizacao !== 100
        ? percentualAtualizacao.toFixed(2) + '% do '
        : ''
    }${taxaReferencia.valueOf()}`;
  } else if (taxaReferencia === TaxaReferenciaEnum.IPCA) {
    return `${taxaReferencia.valueOf()}${
      percentualAtualizacao > 0
        ? ' + ' +
          separadorDecimalFormatUtil(percentualAtualizacao.toFixed(2)) +
          '% a.a.'
        : ''
    }`;
  } else {
    return `${separadorDecimalFormatUtil(
      percentualAtualizacao.toFixed(2),
    )}% a.a.`;
  }
};
