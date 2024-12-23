export const getKospiMarketValue = async (reutersCode: string) => {
  const response = await fetch(
    'https://m.stock.naver.com/api/stock/003550/integration',
  );
  const data = await response.json();
  return data.totalInfos.find(
    (info: { code: string }) => info.code === 'marketValue',
  ).value;
};
