import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';
import { GoogleRecaptchaFilter } from './filters/google-recaptcha.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ErrorFilter(), new GoogleRecaptchaFilter());
    await app.listen(3000);
}
bootstrap();
