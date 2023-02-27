import { CalcularValorImpostoRendaService } from './calcular-valor-imposto-renda.service';
import { CalcularRentabilidadeService } from './calcular-rentabilidade.service';
import { CalcularInvestimentoService } from './calcular-investimento.service';
import { CalcularValorIofService } from './calcular-valor-iof.service';
import { PeriodicidadeEnum } from '../enums/periodicidade.enum';
import { InvestimentoParametrosDTO } from '../dtos/investimento-parametros.dto';

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

  it('deve retornar os parâmetros de cálculo do investimento com incidência de IR', async () => {
    const principal = 1000;
    const tempoInvestimento = 28;
    const periodicidade = PeriodicidadeEnum.DIAS;
    const taxaDecimal = 0.00013554;
    const incideIR = true;

    const parametros: InvestimentoParametrosDTO = {
      rentabilidadeBruta: 3.8,
      valorImpostoRenda: 0.8,
      valorIof: 0.23,
      rentabilidadeLiquida: 2.77,
      montante: 1002.77,
    };

    expect(
      calcularInvestimentoService.execute(
        principal,
        tempoInvestimento,
        periodicidade,
        taxaDecimal,
        incideIR,
      ),
    ).toEqual(parametros);
  });

  it('deve retornar os parâmetros de cálculo do investimento sem incidência de IR', async () => {
    const principal = 1000;
    const tempoInvestimento = 12;
    const periodicidade = PeriodicidadeEnum.MESES;
    const taxaDecimal = 0.01071983;
    const incideIR = false;

    const parametros: InvestimentoParametrosDTO = {
      rentabilidadeBruta: 136.5,
      valorImpostoRenda: 0,
      valorIof: 0,
      rentabilidadeLiquida: 136.5,
      montante: 1136.5,
    };

    expect(
      calcularInvestimentoService.execute(
        principal,
        tempoInvestimento,
        periodicidade,
        taxaDecimal,
        incideIR,
      ),
    ).toEqual(parametros);
  });
});
