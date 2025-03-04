import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        
        return {
          transports: [
            // Console logger for development and production
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                isProduction 
                  ? winston.format.json()
                  : winston.format.combine(
                      winston.format.colorize(),
                      winston.format.printf(({ timestamp, level, message, context }) => {
                        return `${timestamp} [${context}] ${level}: ${message}`;
                      }),
                    )
              ),
            }),
            
            // File logger for errors
            new winston.transports.File({
              filename: 'logs/error.log',
              level: 'error',
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
              ),
            }),
            
            // File logger for all logs
            new winston.transports.File({
              filename: 'logs/combined.log',
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
              ),
            }),
          ],
        };
      },
    }),
  ],
  exports: [WinstonModule],
})
export class LoggingModule {} 