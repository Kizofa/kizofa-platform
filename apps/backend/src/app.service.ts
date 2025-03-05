import { Injectable } from '@nestjs/common';
import { FeatureFlagsService } from './config/feature-flags';

@Injectable()
export class AppService {
  constructor(private readonly featureFlagsService: FeatureFlagsService) {}

  getHello(): string {
    // Example of using feature flags
    if (this.featureFlagsService.isEnabled('ENABLE_KYC_VERIFICATION')) {
      return 'Hello World! KYC verification is enabled.';
    } else {
      return 'Hello World! KYC verification is disabled.';
    }
  }
}
