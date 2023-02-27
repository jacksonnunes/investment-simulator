import { Module } from '@nestjs/common';

import { ClientModule } from 'src/client/client.module';
import { InvestimentoService } from './services/investimento.service';
import { CalcularInvestimentoService } from './services/calcular-investimento.service';
import { CalcularRentabilidadeService } from './services/calcular-rentabilidade.service';
import { CalcularTaxaEquivalenteService } from './services/calcular-taxa-equivalente.service';
import { CalcularValorImpostoRendaService } from './services/calcular-valor-imposto-renda.service';
import { CalcularValorIofService } from './services/calcular-valor-iof.service';
import { CalculosController } from './infra/controllers/calculos.controller';

@Module({
  imports: [ClientModule],
  providers: [
    CalcularInvestimentoService,
    CalcularRentabilidadeService,
    CalcularTaxaEquivalenteService,
    CalcularValorImpostoRendaService,
    CalcularValorIofService,
    InvestimentoService,
  ],
  controllers: [CalculosController],
})
export class CalculoModule {}
