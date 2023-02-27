import { ApiProperty } from '@nestjs/swagger';

import { ModalidadeEnum } from '../enums/modalidade.enum';
import { PeriodicidadeEnum } from '../enums/periodicidade.enum';
import { TaxaReferenciaEnum } from '../enums/taxa-referencia.enum';

export class InvestimentoRequestDTO {
  @ApiProperty({ enum: { ModalidadeEnum } })
  modalidade: ModalidadeEnum;

  @ApiProperty({ description: 'Valor do investimento' })
  principal: number;

  @ApiProperty({ description: 'Tempo total do investimento' })
  tempo: number;

  @ApiProperty({ enum: { PeriodicidadeEnum } })
  periodicidade: PeriodicidadeEnum;

  @ApiProperty({ enum: { TaxaReferenciaEnum } })
  taxaReferencia: TaxaReferenciaEnum;

  @ApiProperty({
    description:
      'Percentual de utilização do CDI; Percentual de incremento do IPCA; Percentual de atualização com taxa fixa.',
  })
  percentualAtualizacao: number;
}
