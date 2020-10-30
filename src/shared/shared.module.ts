import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from './modules/config';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';

const MODULES = [
    ConfigModule,
    GoogleRecaptchaModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
            secretKey: config.recaptchaSecret,
            response: req => req.headers.recaptcha,
        }),
        inject: [ConfigService],
    }),
];

@Global()
@Module({
    imports: MODULES,
    exports: MODULES,
})
export class SharedModule {}
