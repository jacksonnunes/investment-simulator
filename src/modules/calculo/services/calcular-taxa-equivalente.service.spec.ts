import { PeriodicidadeEnum } from '../enums/periodicidade.enum';
import { CalcularTaxaEquivalenteService } from './calcular-taxa-equivalente.service';

describe('Calculate tax-equivalent', () => {
  const calcularTaxaEquivalenteService = new CalcularTaxaEquivalenteService();

  it('should calculate the equivalent tax from daily to monthly', () => {
    const taxa = 0.00035549;
    const periodicidadeAtual = PeriodicidadeEnum.DIAS;
    const periodicidadeDesejada = PeriodicidadeEnum.MESES;

    const taxaEquivalente = 0.01071986;

    expect(
      calcularTaxaEquivalenteService.execute(
        taxa,
        periodicidadeAtual,
        periodicidadeDesejada,
      ),
    ).toEqual(taxaEquivalente);
  });

  it('should calculate the equivalent tax from daily to yearly', () => {
    const taxa = 0.00035549;
    const periodicidadeAtual = PeriodicidadeEnum.DIAS;
    const periodicidadeDesejada = PeriodicidadeEnum.ANOS;

    const taxaEquivalente = 0.13650033;

    expect(
      calcularTaxaEquivalenteService.execute(
        taxa,
        periodicidadeAtual,
        periodicidadeDesejada,
      ),
    ).toEqual(taxaEquivalente);
  });

  it('should calculate the equivalent tax from monthly to daily', () => {
    const taxa = 0.01071983;
    const periodicidadeAtual = PeriodicidadeEnum.MESES;
    const periodicidadeDesejada = PeriodicidadeEnum.DIAS;

    const taxaEquivalente = 0.00035549;

    expect(
      calcularTaxaEquivalenteService.execute(
        taxa,
        periodicidadeAtual,
        periodicidadeDesejada,
      ),
    ).toEqual(taxaEquivalente);
  });

  it('should calculate the equivalent tax from monthly to yearly', () => {
    const taxa = 0.01071983;
    const periodicidadeAtual = PeriodicidadeEnum.MESES;
    const periodicidadeDesejada = PeriodicidadeEnum.ANOS;

    const taxaEquivalente = 0.13649999;

    expect(
      calcularTaxaEquivalenteService.execute(
        taxa,
        periodicidadeAtual,
        periodicidadeDesejada,
      ),
    ).toEqual(taxaEquivalente);
  });

  it('should calculate the equivalent tax from yearly to daily', () => {
    const taxa = 0.1365;
    const periodicidadeAtual = PeriodicidadeEnum.ANOS;
    const periodicidadeDesejada = PeriodicidadeEnum.DIAS;

    const taxaEquivalente = 0.00035549;

    expect(
      calcularTaxaEquivalenteService.execute(
        taxa,
        periodicidadeAtual,
        periodicidadeDesejada,
      ),
    ).toEqual(taxaEquivalente);
  });

  it('should calculate the equivalent tax from yearly to monthly', () => {
    const taxa = 0.1365;
    const periodicidadeAtual = PeriodicidadeEnum.ANOS;
    const periodicidadeDesejada = PeriodicidadeEnum.MESES;

    const taxaEquivalente = 0.01071983;

    expect(
      calcularTaxaEquivalenteService.execute(
        taxa,
        periodicidadeAtual,
        periodicidadeDesejada,
      ),
    ).toEqual(taxaEquivalente);
  });
});
