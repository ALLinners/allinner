export const calculateSpace = (content: string) => {
  const matches = content.match(/[a-zA-Z]/g);
  const alphabetsCount = matches ? matches.length : 0;
  let space = '';
  let usedPixel = 0;

  for (let i = 0; i < alphabetsCount; i++) {
    usedPixel += 10;
  }

  for (let i = 0; i < content.length - alphabetsCount; i++) {
    usedPixel += 15;
  }

  let needSpacePixel = 150 - usedPixel;
  let requiredKoreanSpace = 0;
  if (needSpacePixel % 10 == 5) {
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
