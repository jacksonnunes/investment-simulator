import { TaxaReferenciaEnum } from '../enums/taxa-referencia.enum';

export const rentabilidadeFormatUtil = (
  taxaReferencia: TaxaReferenciaEnum,
  percentualAtualizacao: number,
): string => {
  if (taxaReferencia === TaxaReferenciaEnum.CDI) {
    return `${
      percentualAtualizacao !== 100
        ? percentualAtualizacao.toFixed(2) + '% '
        : ''
    }${taxaReferencia.valueOf()}`;
  } else if (taxaReferencia === TaxaReferenciaEnum.IPCA) {
    return `${taxaReferencia.valueOf()}${
      percentualAtualizacao > 0
        ? ' + ' + percentualAtualizacao.toFixed(2) + '%'
        : ''
    }`;
  } else {
    return `${percentualAtualizacao.toFixed(2)}%`;
  }
};
