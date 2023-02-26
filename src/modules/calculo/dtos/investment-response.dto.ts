import { InvestmentInformationDTO } from './investment-information.dto';
import { InvestmentParametersDTO } from './investment-parameters.dto';

export interface InvestmentResponseDTO {
  period: string;
  principal: number;
  information: InvestmentInformationDTO;
  parameters: InvestmentParametersDTO;
}
