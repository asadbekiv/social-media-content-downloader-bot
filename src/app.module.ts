import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { SocialMediaService } from './service/social-media.service';

@Module({
  imports: [TelegramBotModule],
  controllers: [AppController],
  providers: [AppService, SocialMediaService],
})
export class AppModule {}
