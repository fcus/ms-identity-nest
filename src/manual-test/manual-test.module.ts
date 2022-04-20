import { Module } from '@nestjs/common';
import { MsIdentityService } from '../lib/ms-identity.service';
import { ManualTestController } from './manual-test.controller';

@Module({
    controllers: [ManualTestController],
    providers: [MsIdentityService],
})
export class ManualTestModule {}
