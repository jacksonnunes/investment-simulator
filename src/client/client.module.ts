import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { BacenClientService } from './bacen/bacen-client.service';

@Module({
  imports: [HttpModule],
  providers: [BacenClientService],
  exports: [BacenClientService],
})
export class ClientModule {}
