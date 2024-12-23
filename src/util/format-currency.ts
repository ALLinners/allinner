export const formatCurrency = (amount: number | string): string => {
  const numberAmount =
    typeof amount === 'string'
      ? parseFloat(amount.replace(/[^0-9.-]+/g, ''))
      : amount;

  if (isNaN(numberAmount)) return '';
  return numberAmount.toLocaleString();
};

// input: 10000 | '10000' => output: '10,000'
