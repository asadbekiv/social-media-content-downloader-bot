import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './telegram-bot.service';
import { SocialMediaService } from 'src/service/social-media.service';

@Module({
  controllers: [TelegramBotController],
  providers: [TelegramBotService, SocialMediaService],
})
export class TelegramBotModule {}
