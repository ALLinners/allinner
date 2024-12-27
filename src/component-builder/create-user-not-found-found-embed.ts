import { EmbedBuilder } from 'discord.js';

export const createUserNotFoundEmbed = async () => {
  return new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle('사용자를 찾을 수 없습니다.')
    .setDescription(
      "가입되지 않은 사용자입니다.\n가입하려면 '!가입' 을 입력해주세요.",
    );
};
