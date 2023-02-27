import { Body, Controller, Post } from '@nestjs/common';
import { AppError } from 'src/errors/app.error';

import { InvestimentoRequestDTO } from '../../dtos/investimento-request.dto';
import { InvestimentoResponseDTO } from '../../dtos/investimento-response.dto';
import { InvestimentoService } from '../../services/investimento.service';

@Controller('calculos')
export class CalculosController {
  constructor(private investimentoService: InvestimentoService) {}

  @Post('calcular')
  async calcular(
    @Body() investimentoRequestDTO: InvestimentoRequestDTO,
  ): Promise<InvestimentoResponseDTO> {
    try {
      return this.investimentoService.execute(investimentoRequestDTO);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError('Erro inesperado, estamos analisando o problema.');
    }
  }
}
