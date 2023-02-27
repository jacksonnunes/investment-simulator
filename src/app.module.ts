import { Module } from '@nestjs/common';

import { CalculoModule } from './modules/calculo/calculo.module';

@Module({
  imports: [CalculoModule],
})
export class AppModule {}
