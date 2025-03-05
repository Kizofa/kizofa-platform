import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggingModule } from './logging/logging.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { FeatureFlagsModule } from './config/feature-flags.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    LoggingModule,
    HealthModule,
    AuthModule,
    FeatureFlagsModule,
    ThrottlerModule.forRoot({
      ttl: 60, // time-to-live in seconds
      limit: 10, // limit the number of requests in the ttl
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
