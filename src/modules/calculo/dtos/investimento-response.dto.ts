import { InvestimentoParametrosDTO } from './investimento-parametros.dto';

export interface InvestimentoResponseDTO {
  modalidade: string;
  rentabilidade: string;
  tempoInvestimento: string;
  valorInvestido: number;
  parametros: InvestimentoParametrosDTO;
}
