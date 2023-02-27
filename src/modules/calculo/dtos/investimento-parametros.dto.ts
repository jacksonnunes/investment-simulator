import { ApiProperty } from '@nestjs/swagger';

export class InvestimentoParametrosDTO {
  @ApiProperty()
  rentabilidadeBruta: number;

  @ApiProperty()
  valorImpostoRenda: number;

  @ApiProperty()
  valorIof: number;

  @ApiProperty()
  rentabilidadeLiquida: number;

  @ApiProperty()
  montante: number;
}
