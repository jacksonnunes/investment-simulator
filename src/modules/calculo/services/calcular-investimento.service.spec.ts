import { CalcularValorImpostoRendaService } from './calcular-valor-imposto-renda.service';
import { CalcularRentabilidadeService } from './calcular-rentabilidade.service';
import { CalcularInvestimentoService } from './calcular-investimento.service';
import { CalcularValorIofService } from './calcular-valor-iof.service';
import { PeriodicidadeEnum } from '../enums/periodicidade.enum';

describe('Calculate investment', () => {
  const calcularRentabilidadeService = new CalcularRentabilidadeService();
  const calcularValorImpostoRendaService =
    new CalcularValorImpostoRendaService();
  const calcularValorIofService = new CalcularValorIofService();
  const calcularInvestimentoService = new CalcularInvestimentoService(
    calcularRentabilidadeService,
    calcularValorImpostoRendaService,
    calcularValorIofService,
  );

  it('should calculate an investment', async () => {
    const principal = 1000;
    const tempoInvestimento = 28;
    const periodicidade = PeriodicidadeEnum.DIAS;
    const taxaDecimal = 0.00013554;
    const incideIR = true;

    const iofTax = 0.23;

    const investment = calcularInvestimentoService.execute(
      principal,
      tempoInvestimento,
      periodicidade,
      taxaDecimal,
      incideIR,
    );

    expect(investment.valorIof).toEqual(iofTax);
  });
});
