import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { CalculoModule } from './modules/calculo/calculo.module';

@Module({
  imports: [
    CalculoModule,
    ThrottlerModule.forRoot({
      ttl: 20,
      limit: 5,
    }),
  ],
})
export class AppModule {}
