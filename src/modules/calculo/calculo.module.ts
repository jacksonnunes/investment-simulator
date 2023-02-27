import { Module } from '@nestjs/common';
import { CalculosController } from './infra/controllers/calculos.controller';

import { InvestimentoService } from './services/investimento.service';

@Module({
  providers: [InvestimentoService],
  controllers: [CalculosController],
})
export class CalculoModule {}
