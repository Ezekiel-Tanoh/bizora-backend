import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('chat')
  chat(@Body() body: { message: string }) {
    return this.aiService.chat(body.message);
  }

  @Post('generate-description')
  generateDescription(@Body() body: { productName: string; category: string }) {
    return this.aiService.generateProductDescription(body.productName, body.category);
  }

  @Post('generate-post')
  generatePost(@Body() body: { productName: string; price: number }) {
    return this.aiService.generateMarketingPost(body.productName, body.price);
  }
}