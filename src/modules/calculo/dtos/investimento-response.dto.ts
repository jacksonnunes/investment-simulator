import { ApiProperty } from '@nestjs/swagger';

import { InvestimentoParametrosDTO } from './investimento-parametros.dto';

export class InvestimentoResponseDTO {
  @ApiProperty()
  modalidade: string;

  @ApiProperty()
  rentabilidade: string;

  @ApiProperty()
  tempoInvestimento: string;

  @ApiProperty()
  valorInvestido: number;

  @ApiProperty({ type: InvestimentoParametrosDTO })
  parametros: InvestimentoParametrosDTO;
}
