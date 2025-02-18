import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot, Context } from 'grammy';
import { SocialMediaService } from 'src/service/social-media.service';
import 'dotenv/config';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: Bot<Context>;
  private readonly token = process.env.BOT_TOKEN;

  constructor(private readonly socialMediaService: SocialMediaService) {}

  onModuleInit() {
    this.bot = new Bot<Context>(this.token);

    this.bot.on('message', async (ctx) => {
      const text = ctx.message?.text;

      if (text) {
        const content = await this.socialMediaService.fetchContent(text);
        await ctx.reply(content.toString());
      } else {
        await ctx.reply('Please send a valid link.');
      }
    });

    this.bot.start();
  }
}
