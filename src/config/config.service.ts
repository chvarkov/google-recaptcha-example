import { config, DotenvParseOutput } from 'dotenv';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    env: DotenvParseOutput = {};

    constructor() {
        this.env = config({path: '.env'}).parsed || {};
    }

    get recaptchaSecret(): string {
        return this.env.RECAPTCHA_SECRET;
    }
}
