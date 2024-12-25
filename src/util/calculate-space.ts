export const calculateSpace = (content: string) => {
  const matches = content.match(/[ㄱ-힣]/g);
  const koreanCount = matches ? matches.length : 0;
  let space = '';
  let usedPixel = 0;

  for (let i = 0; i < koreanCount; i++) {
    usedPixel += 15;
  }

  for (let i = 0; i < content.length - koreanCount; i++) {
    usedPixel += 10;
  }

  let needSpacePixel = 150 - usedPixel;
  let requiredKoreanSpace = 0;
  if (needSpacePixel % 10 == (4 | 5 | 6)) {
    requiredKoreanSpace = 1;
    needSpacePixel -= 15;
  }
  const requiredEnglishSpace = needSpacePixel / 10;

  for (let i = 0; i < requiredKoreanSpace; i++) {
    space += '　';
  }
  for (let i = 0; i < requiredEnglishSpace; i++) {
    space += ' ';
  }

  return space;
};
