import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcularRentabilidadeService {
  public execute(principal: number, taxaJuros: number, tempo: number): number {
    const rentabilidade = principal * (Math.pow(1 + taxaJuros, tempo) - 1);
    return Number(rentabilidade.toFixed(2));
  }
}
