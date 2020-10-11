import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { Config } from './core/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'
import { recaptchaErrorHandler } from './helpers/recaptcha-error-handler';

@Module({
    imports: [
        GoogleRecaptchaModule.forRoot({
            secretKey: Config.recaptchaSecret,
            response: req => req.headers.recaptcha,
            onError: recaptchaErrorHandler,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
