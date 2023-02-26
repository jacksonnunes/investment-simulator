import { CalcularRentabilidadeService } from './calcular-rentabilidade.service';

describe('Calculate Income', () => {
  const calcularRentabilidadeService = new CalcularRentabilidadeService();

  it('should calculate income', () => {
    const principal = 1000;
    const taxaJuros = 0.03;
    const tempo = 3;
    const rentabilidade = 92.73;

    expect(
      calcularRentabilidadeService.execute(principal, taxaJuros, tempo),
    ).toEqual(rentabilidade);
  });
});
