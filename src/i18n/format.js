import numeral from 'numeral';

export const currencyFormat = (amount) => {
  return numeral(amount).format(`$0,0.00`)
}
