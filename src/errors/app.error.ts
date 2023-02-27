import { ApiProperty } from '@nestjs/swagger';

export class AppError {
  @ApiProperty()
  public readonly message: string;

  @ApiProperty()
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
