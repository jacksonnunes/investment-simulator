import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CalculoModule } from './modules/calculo/calculo.module';

@Module({
  imports: [CalculoModule],
  controllers: [AppController],
})
export class AppModule {}
