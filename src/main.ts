import { NestFactory } from '@nestjs/core';
import { ManualTestModule } from './manual-test/manual-test.module';

async function bootstrap() {
    const app = await NestFactory.create(ManualTestModule);
    await app.listen(3000);
}
bootstrap();
