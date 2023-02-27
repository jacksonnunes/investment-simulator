import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AppError } from 'src/errors/app.error';
import { InvestimentoRequestDTO } from '../../dtos/investimento-request.dto';
import { InvestimentoResponseDTO } from '../../dtos/investimento-response.dto';
import { InvestimentoService } from '../../services/investimento.service';

@ApiTags('Cálculo')
@Controller('calculos')
export class CalculosController {
  constructor(private investimentoService: InvestimentoService) {}

  @Post('calcular')
  @ApiOperation({ summary: 'Calcular investimento' })
  @ApiBody({
    type: InvestimentoRequestDTO,
    examples: {
      a: {
        summary: 'Exemplo de requisição preenchida',
        description: 'Todos os valores precisam estar preenchidos.',
        value: {
          modalidade: 'Tesouro Direto',
          principal: 1000.45,
          tempo: 3,
          periodicidade: 2,
          taxaReferencia: 'CDI',
          percentualAtualizacao: 100.98,
        } as InvestimentoRequestDTO,
      },
    },
  })
  @ApiResponse({
    type: InvestimentoResponseDTO,
    status: 201,
    description: 'Created',
  })
  @ApiInternalServerErrorResponse({
    type: AppError,
    description: 'Internal Server Error',
  })
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
