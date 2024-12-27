export const calculateSpace = (content: string, maxWidth: number) => {
  const matches = content.match(/[ㄱ-힣]/g);
  const koreanCount = matches ? matches.length : 0;
  let space = '';
  let usedPixel = 0;

  const koreanSpace = 7;
  const englishSpace = 5;
  const maxChar = maxWidth;

  for (let i = 0; i < koreanCount; i++) {
    usedPixel += koreanSpace;
  }

  for (let i = 0; i < content.length - koreanCount; i++) {
    usedPixel += englishSpace;
  }

  let needSpacePixel = koreanSpace * maxChar - usedPixel;

  for (let i = 0; i <= needSpacePixel / koreanSpace; i++) {
    if ((needSpacePixel - koreanSpace * i) % englishSpace == 0) {
      for (let j = 0; j < i; j++) {
        space += '　';
      }
      needSpacePixel -= koreanSpace * i;
      break;
    }
  }

  const requiredEnglishSpace = needSpacePixel / englishSpace;
  for (let i = 0; i < requiredEnglishSpace; i++) {
    space += ' ';
  }

  return space;
};
