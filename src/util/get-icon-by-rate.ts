import { formatCurrency } from './format-currency';

export const getChangeValueWithIcon = (
  changeValue: string | number,
): string => {
  changeValue = Number(changeValue);
  let result = '▶ ' + changeValue;

  if (changeValue > 0) result = '▲ ' + formatCurrency(changeValue);
  if (changeValue < 0) {
    changeValue = String(changeValue).substring(1);
    result = '▼ ' + formatCurrency(changeValue);
  }

  return result;
};
