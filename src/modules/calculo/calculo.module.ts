import { Module } from '@nestjs/common';

import { CalcularInvestimentoService } from './services/calcular-investimento.service';

@Module({
  providers: [CalcularInvestimentoService],
})
export class CalculoModule {}
