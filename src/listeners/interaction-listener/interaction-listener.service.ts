import { Injectable } from '@nestjs/common';
import {
  ActionRowBuilder,
  ButtonInteraction,
  Interaction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { fetchStockData } from '../../util/fetch-stock-data';
import { MessageCacheService } from '../../services/message-cache.service';
import { StockService } from '../../services/stock.service';
import { calculateUsdToKrw } from '../../util/calculate-usd-to-krw';
import { formatCurrency } from '../../util/format-currency';

@Injectable()
export class InteractionListenerService {
  constructor(
    private readonly messageCacheService: MessageCacheService,
    private readonly stockService: StockService,
  ) {}

  handleInteraction(interaction: Interaction) {
    if (interaction.isButton()) {
      this.handleButtonInteraction(interaction);
    } else if (interaction.isModalSubmit()) {
      this.handleModalSubmitInteraction(interaction);
    }
  }

  private async handleButtonInteraction(interaction: ButtonInteraction) {
    const customId = interaction.customId;

    switch (customId) {
      case 'buyStock':
        if (!this.messageCacheService.getState(interaction.user.id))
          break; // 메세지를 보낸 사람과 버튼을 누른 사람이 다를 때 return
        else if (
          interaction.user.id !==
          this.messageCacheService.getState(interaction.user.id)?.author.id
        )
          break;

        const stockName = this.messageCacheService
          .getState(interaction.user.id)
          ?.content.split(' ')
          .slice(1)[0];

        const findStock = await this.stockService.findByName(stockName);
        const stockData = await fetchStockData(findStock);

        const modal = new ModalBuilder()
          .setCustomId('buyStockModal')
          .setTitle('매수하기');

        const basicPrice = stockData.closePrice;

        if (stockData.currencyType && stockData.currencyType.name === 'USD') {
          const krw = await calculateUsdToKrw(stockData.closePrice);
          stockData.closePrice = String(formatCurrency(Math.round(krw)));
        }

        const stockQuantityInput = new TextInputBuilder()
          .setCustomId('stockQuantity')
          .setLabel(
            stockData.stockName +
              ' (' +
              stockData.symbolCode +
              ')' +
              '\u3000/\u3000' +
              '주당 ' +
              stockData.closePrice +
              ' KRWㅣ' +
              basicPrice +
              ' ' +
              stockData.currencyType.name,
          )
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('예: 10')
          .setRequired(true);

        const amountRow =
          new ActionRowBuilder<TextInputBuilder>().addComponents(
            stockQuantityInput,
          );

        modal.addComponents(amountRow);

        await interaction.showModal(modal);

        this.messageCacheService.deleteState(interaction.user.id);
        break;

      default:
        // Default
        break;
    }
  }

  private async handleModalSubmitInteraction(
    interaction: ModalSubmitInteraction,
  ) {
    const customId = interaction.customId;

    switch (customId) {
      case 'buyStockModal':
        const stockQuantity =
          interaction.fields.getTextInputValue('stockQuantity');

        await interaction.reply({
          content: `${stockQuantity}주를 성공적으로 매수했습니다 !`,
        });
        break;
    }
  }
}
