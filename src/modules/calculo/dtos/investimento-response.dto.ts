import { InvestmentoParametrosDTO } from './investmento-parametros.dto';

export interface InvestimentoResponseDTO {
  modalidade: string;
  rentabilidade: string;
  tempoInvestimento: string;
  valorInvestido: number;
  parametros: InvestmentoParametrosDTO;
}
