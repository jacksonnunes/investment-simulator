import { Module } from '@nestjs/common';
import { BacenClientService } from './bacen/bacen-client.service';

@Module({
  providers: [BacenClientService],
})
export class ClientModule {}
