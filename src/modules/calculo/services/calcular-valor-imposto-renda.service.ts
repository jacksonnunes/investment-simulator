import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcularValorImpostoRendaService {
  PRIMEIRA_FAIXA = 0.225;
  SEGUNDA_FAIXA = 0.2;
  TERCEIRA_FAIXA = 0.175;
  QUARTA_FAIXA = 0.15;

  public execute(rentabilidade: number, dias: number): number {
    if (dias <= 180) {
      return rentabilidade * this.PRIMEIRA_FAIXA;
    } else if (dias > 180 && dias <= 360) {
      return rentabilidade * this.SEGUNDA_FAIXA;
    } else if (dias > 360 && dias <= 720) {
      return rentabilidade * this.TERCEIRA_FAIXA;
    } else {
      return rentabilidade * this.QUARTA_FAIXA;
    }
  }
}
