import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Controller()
export class AppController {
  // Using NestJS Logger for simplicity in components
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    // Injecting Winston Logger directly when needed
    @Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: WinstonLogger
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('Get hello endpoint called');
    this.winstonLogger.info('Get hello endpoint called with Winston', { 
      context: AppController.name,
      endpoint: 'GET /' 
    });
    return this.appService.getHello();
  }
}
