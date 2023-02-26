import { CalcularValorIofService } from './calcular-valor-iof.service';

describe('Calculate IOF Tax', () => {
  const calcularValorIofService = new CalcularValorIofService();

  it('should calculate iof value', () => {
    const rentabilidade = 1000;
    const dias = 13;
    const valorIof = 560;

    expect(calcularValorIofService.execute(rentabilidade, dias)).toEqual(
      valorIof,
    );
  });
});
