import { ModalidadeEnum } from '../enums/modalidade.enum';
import { PeriodicidadeEnum } from '../enums/periodicidade.enum';
import { TaxaReferenciaEnum } from '../enums/taxa-referencia.enum';

export interface InvestimentoRequestDTO {
  modalidade: ModalidadeEnum;
  principal: number;
  tempo: number;
  periodicidade: PeriodicidadeEnum;
  taxaReferencia: TaxaReferenciaEnum;
  percentualAtualizacao: number;
}
