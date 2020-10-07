import { config, DotenvParseOutput } from 'dotenv';

export class Config {
    private static readonly env: DotenvParseOutput = config({path: '.env'}).parsed || {};

    static get recaptchaSecret(): string {
        return this.env.RECAPTCHA_SECRET;
    }

}
