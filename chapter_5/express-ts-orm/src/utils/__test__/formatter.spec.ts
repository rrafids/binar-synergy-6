import { formatToRupiah } from '../formatter';

describe('formatToRupiah', () => {
  it('should return a list of Tweets', () => {
    const moneyAmount = '15000';
    const moneyRupiahFormatted = formatToRupiah(moneyAmount);

    expect(moneyRupiahFormatted).toEqual(`Rp ${moneyAmount}`);
  });
});
