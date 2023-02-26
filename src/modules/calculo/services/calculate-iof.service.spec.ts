import { CalculateIofService } from './calculate-iof.service';

describe('Calculate IOF Tax', () => {
  const calculateIofService = new CalculateIofService();

  it('should calculate iof tax', () => {
    const value = 1000;
    const days = 13;
    const iof = 560;
    expect(calculateIofService.execute(value, days)).toEqual(iof);
  });
});
