import { CalcularValorImpostoRendaService } from './calcular-valor-imposto-renda.service';

describe('Calculate Income Tax', () => {
  const calcularValorImpostoRendaService =
    new CalcularValorImpostoRendaService();

  it('should calculate income tax into first track', () => {
    const rentabilidade = 200;
    const dias = 60;
    const valorImpostoRenda = 45;

    expect(
      calcularValorImpostoRendaService.execute(rentabilidade, dias),
    ).toEqual(valorImpostoRenda);
  });

  it('should calculate income tax into second track', () => {
    const rentabilidade = 200;
    const dias = 181;
    const valorImpostoRenda = 40;

    expect(
      calcularValorImpostoRendaService.execute(rentabilidade, dias),
    ).toEqual(valorImpostoRenda);
  });

  it('should calculate income tax into third track', () => {
    const rentabilidade = 200;
    const dias = 361;
    const valorImpostoRenda = 35;

    expect(
      calcularValorImpostoRendaService.execute(rentabilidade, dias),
    ).toEqual(valorImpostoRenda);
  });

  it('should calculate income tax into fourth track', () => {
    const rentabilidade = 200;
    const dias = 721;
    const valorImpostoRenda = 30;

    expect(
      calcularValorImpostoRendaService.execute(rentabilidade, dias),
    ).toEqual(valorImpostoRenda);
  });
});
